import type React from "react";
import { useState } from "react";

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setQuery("");
      setIsActive(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsActive(false), 200);
  };

  return (
    <div className="hidden sm:flex items-center">
      {isActive ? (
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="bg-input-field text-foreground placeholder-muted-foreground px-4 py-1 rounded-xl text-sm focus:outline-none focus:ring-2 w-40 transition-all"
          />
        </form>
      ) : (
        <button
          onClick={() => setIsActive(true)}
          className="p-2 hover:bg-muted rounded-xl transition-colors"
          aria-label="Search"
        >
          <svg
            className="w-6 h-6 lg:w-8 lg:h-8 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
