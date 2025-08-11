import React, { useEffect, useState } from "react";
import {
  LucideImage,
  LucideList,
  LucideSparkles,
  LucideVideo,
} from "lucide-react";
import WebResultsDisplay from "./WebResultsDisplay";
import ImagesResultsDisplay from "./ImagesResultsDisplay";
import VideosResultsDisplay from "./VideosResultsDisplay";
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

function formatWebResults(searchResp) {
  if (!searchResp?.web?.results) return [];
  return searchResp.web.results.map((item) => ({
    title: item?.title,
    description: item?.description,
    long_name: item?.profile?.long_name,
    img: item?.profile?.img,
    url: item?.url,
    thumbnail: item?.thumbnail?.src,
  }));
}

async function GenerateAIResp(formattedSearchResp, recordId) {
  const result = await fetch("/api/llm-model", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      searchResult: formattedSearchResp,
      recordId,
    }),
  });
  return result.json();
}

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
          searchInput: searchInputRecord.searchInput,
          searchType: type,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.details || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      setSearchResult(data);
      console.log("API Response:", data);
      console.log("Stringified Response:", JSON.stringify(data));

      if (type === "web") {
        const formattedSearchResp = formatWebResults(data);
        const recordId = "local-" + Date.now();
        GenerateAIResp(formattedSearchResp, recordId)
          .then((resp) => console.log("AI Resp:", resp))
          .catch((err) => console.error("AI Error:", err));
      }

      
    } catch (err) {
      setError(err.message || "Failed to fetch search results");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchInputRecord && searchInputRecord.searchInput) {
      const braveType = braveSearchTypeMap[activeTab];
      console.log(braveType);
      if (braveType) {
        GetSearchApiResult(searchInputRecord.searchInput, braveType);
      }
    }
  }, [searchInputRecord, activeTab]);

  return (
    <div className="mt-7">
      <h2 className="font-medium text-3xl line-clamp-2 mb-2">{searchInputRecord?.searchInput}</h2>
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
        {!isLoading && !error && searchResult && (
          <>
            {activeTab === "Answer" && (
              <WebResultsDisplay searchResult={searchResult} />
            )}
            {activeTab === "Images" && (
              <ImagesResultsDisplay searchResult={searchResult} />
            )}
            {activeTab === "Videos" && (
              <VideosResultsDisplay searchResult={searchResult} />
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
          </>
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
