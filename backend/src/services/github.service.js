import axios from "axios";

const base = process.env.GITHUB_API_BASE || "https://api.github.com";

export async function searchReposOnGitHub(keyword, perPage = 30) {
  const url = `${base}/search/repositories`;
  const params = { q: keyword, per_page: perPage, sort: "stars", order: "desc" };

  // If you have a GitHub token, you could set headers for higher rate limits
  // const headers = { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` };

  const { data } = await axios.get(url, { params /*, headers*/ });
  // normalize
  const items = (data.items || []).map((r) => ({
    repoId: r.id,
    name: r.name,
    fullName: r.full_name,
    htmlUrl: r.html_url,
    description: r.description,
    language: r.language,
    stargazers: r.stargazers_count,
    ownerLogin: r.owner?.login,
    pushedAt: r.pushed_at ? new Date(r.pushed_at) : null
  }));
  return items;
}
