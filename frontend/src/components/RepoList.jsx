import { useEffect, useState } from "react";
import api from "../api";

export default function RepoList({ searchId }) {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (searchId) fetchRepos(page);
  }, [searchId, page]);

  const fetchRepos = async (p) => {
    const res = await api.get(`/results/${searchId}?page=${p}&limit=5`);
    setRepos(res.data.results);
    setTotal(res.data.total);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Results</h2>
      {repos.length === 0 ? (
        <p>No results yet.</p>
      ) : (
        <div className="grid gap-4">
          {repos.map((repo) => (
            <div key={repo.repoId} className="border p-3 rounded shadow">
              <h3 className="font-bold">{repo.name}</h3>
              <p>{repo.description || "No description"}</p>
              <a
                href={repo.htmlUrl}
                target="_blank"
                className="text-blue-500 underline"
              >
                View Repo
              </a>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}
      {total > 5 && (
        <div className="flex gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <button
            disabled={page * 5 >= total}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
