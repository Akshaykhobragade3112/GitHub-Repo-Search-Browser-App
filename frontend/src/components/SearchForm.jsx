import { useState } from "react";
import api from "../api";

export default function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/search", { keyword });
      onSearch(res.data.searchId);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword..."
        className="border rounded p-2 flex-1"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
