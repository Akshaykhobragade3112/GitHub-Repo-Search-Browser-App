import { useState } from "react";
import API from "./api";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const searchResponse = await API.post("/search", { keyword });
      console.log("Search API response:", searchResponse.data);

      const searchId = searchResponse?.data?.searchId;
      if (!searchId) {
        throw new Error("No searchId returned from API");
      }

      const resultResponse = await API.get(`/results?searchId=${searchId}`);
      console.log("Results API response:", resultResponse.data);

      if (
        resultResponse.data &&
        Array.isArray(resultResponse.data.data) &&
        resultResponse.data.data.length > 0
      ) {
        setResults(resultResponse.data.data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Error in handleSearch:", err);
      setError("Something went wrong! Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">GitHub Repository Search App</h1>

      {/* Input Section */}
      <div className="search-box">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            const value = e.target.value;
            setKeyword(value);

            if (!value.trim()) {
              setResults([]);
              setError("");
            }
          }}
          placeholder="Enter keyword..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Status Messages */}
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {/* Results */}
      <div className="results">
        {results.length > 0 ? (
          <ul className="results-list">
            {results.map((item, index) => (
              <li key={index} className="result-card">
                <a
                  href={item.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-link"
                >
                  {item.fullName}
                </a>
                <p className="repo-description">{item.description}</p>
                <p className="repo-meta">
                  ⭐ {item.stargazers} | {item.language}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p className="status">No results found</p>
        )}
      </div>
    </div>
  );
}

export default App;
