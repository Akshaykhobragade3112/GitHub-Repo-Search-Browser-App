import Repo from "../models/repo.model.js";
import Search from "../models/search.model.js";
import { searchReposOnGitHub } from "../services/github.service.js";
import { getPagination } from "../utils/pagination.js";


export async function createSearch(req, res, next) {
  try {
    const { keyword } = req.body || {};
    if (!keyword || typeof keyword !== "string" || keyword.trim().length < 2) {
      const err = new Error("Invalid keyword. Provide at least 2 characters.");
      err.status = 400;
      throw err;
    }
    const normalized = keyword.trim();

    
    const repos = await searchReposOnGitHub(normalized, 30);

    
    const upsertedIds = [];
    for (const r of repos) {
      const doc = await Repo.findOneAndUpdate(
        { repoId: r.repoId },
        { $set: r },
        { new: true, upsert: true }
      );
      upsertedIds.push(doc._id);
    }

    
    const searchDoc = await Search.create({
      keyword: normalized,
      repos: upsertedIds
    });

    return res.status(201).json({
      message: "Search completed and stored.",
      searchId: searchDoc._id.toString(),
      count: repos.length
    });
  } catch (err) {
    next(err);
  }
}


export async function getResults(req, res, next) {
  try {
    const { searchId } = req.query || {};
    if (!searchId) {
      const err = new Error("searchId is required.");
      err.status = 400;
      throw err;
    }

    const search = await Search.findById(searchId).select("repos keyword createdAt");
    if (!search) {
      const err = new Error("Search not found.");
      err.status = 404;
      throw err;
    }

    const { page, limit, skip } = getPagination(req.query);

    const total = search.repos.length;
    const pageRepoIds = search.repos.slice(skip, skip + limit);

    const data = await Repo.find({ _id: { $in: pageRepoIds } })
      .sort({ stargazers: -1 })
      .lean();

    return res.json({
      page,
      limit,
      total,
      keyword: search.keyword,
      data
    });
  } catch (err) {
    next(err);
  }
}
