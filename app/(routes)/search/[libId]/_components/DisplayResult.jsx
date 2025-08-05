import React, { useEffect, useState, useCallback } from "react";
import {
  LucideImage,
  LucideList,
  LucideSparkles,
  LucideVideo,
} from "lucide-react";
import AnswerDisplay from "./AnswerDisplay";
import PropTypes from "prop-types";

const tabs = [
  { label: "Answer", icon: LucideSparkles },
  { label: "Images", icon: LucideImage },
  { label: "Videos", icon: LucideVideo },
  { label: "Sources", icon: LucideList, badge: 10 },
];

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState("Answer");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const GetSearchApiResult = async () => {
    if (!searchInputRecord?.searchInput || !searchInputRecord?.type) {
      console.warn("Missing search input or type");
      setError("Missing search input or type");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/brave-search-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchInput: searchInputRecord.searchInput,
          searchType: searchInputRecord.type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
        throw new Error(errorData.details || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResult(data);
      console.log("API Response:", data);
      console.log("Stringified Response:", JSON.stringify(data));
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Failed to fetch search results");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetSearchApiResult();
  }, [searchInputRecord]);

  return (
    <div className="mt-7">
      <h2 className="font-medium text-3xl line-clamp-2 mb-2">Responses</h2>
      <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
        {tabs.map(({ label, icon: Icon, badge }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${
              activeTab === label ? "text-black" : ""
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {badge && (
              <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {badge}
              </span>
            )}
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
        {activeTab === "Images" && <div>Images content placeholder</div>}
        {activeTab === "Videos" && <div>Videos content placeholder</div>}
        {activeTab === "Sources" && <div>Sources content placeholder</div>}
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