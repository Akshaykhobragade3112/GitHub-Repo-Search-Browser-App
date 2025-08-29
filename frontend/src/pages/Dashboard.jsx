import { useState } from "react";
import SearchForm from "../components/SearchForm";
import RepoList from "../components/RepoList";

export default function Dashboard() {
  const [searchId, setSearchId] = useState(null);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">GitHub Repository Finder</h1>
      <SearchForm onSearch={setSearchId} />
      {searchId && <RepoList searchId={searchId} />}
    </div>
  );
}
