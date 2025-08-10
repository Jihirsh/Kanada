import React, { useEffect, useState } from "react";
import {
  LucideImage,
  LucideList,
  LucideSparkles,
  LucideVideo,
} from "lucide-react";
import AnswerDisplay from "./AnswerDisplay";
import PropTypes from "prop-types";

const braveSearchTypeMap = {
  Answer: "web",
  Images: "images",
  Videos: "videos",
  Sources: "web",
};

const tabs = [
  { label: "Answer", icon: LucideSparkles },
  { label: "Images", icon: LucideImage },
  { label: "Videos", icon: LucideVideo },
  { label: "Sources", icon: LucideList },
];

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState("Answer");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const GetSearchApiResult = async (input, type) => {
    if (!input || !type) {
      setError("Missing search input or type");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/brave-search-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchInput: localStorage.getItem('kanadaProjectQuery'),
          searchType: type,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResult(data);
      console.log("API Response:", data);
      console.log("Stringified Response:", JSON.stringify(data));
    } catch (err) {
      setError(err.message || "Failed to fetch search results");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchInputRecord && searchInputRecord.searchInput) {
      const braveType = braveSearchTypeMap[activeTab];
      console.log(braveType)
      if (braveType) {
        GetSearchApiResult(searchInputRecord.searchInput, braveType);
      }
    }
  }, [searchInputRecord, activeTab]);

  return (
    <div className="mt-7">
      <h2 className="font-medium text-3xl line-clamp-2 mb-2">Responses</h2>
      <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
        {tabs.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${
              activeTab === label ? "text-black" : ""
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {activeTab === label && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded"></span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {activeTab === "Answer" && searchResult && (
          <AnswerDisplay searchResult={searchResult} />
        )}
        {activeTab === "Images" && (
          <div>
            {searchResult?.results?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {searchResult.results.map((img, i) => (
                  <a
                    key={i}
                    href={img.url || img.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={img.thumbnailUrl || img.image || img.url}
                      alt={img.title || "Result"}
                      className="rounded shadow"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <div>No images found.</div>
            )}
          </div>
        )}
        {activeTab === "Videos" && (
          <div>
            {searchResult?.results?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResult.results.map((vid, i) => (
                  <a
                    key={i}
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex flex-col items-start">
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="rounded shadow mb-2"
                      />
                      <div className="font-medium">{vid.title}</div>
                      <div className="text-xs text-gray-500">{vid.source}</div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div>No videos found.</div>
            )}
          </div>
        )}
        {activeTab === "Sources" && (
          <div>
            {searchResult?.results?.length > 0 ? (
              <ul className="list-disc ml-5">
                {searchResult.results.map((src, i) => (
                  <li key={i}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {src.title || src.url}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No sources found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

DisplayResult.propTypes = {
  searchInputRecord: PropTypes.shape({
    searchInput: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default DisplayResult;