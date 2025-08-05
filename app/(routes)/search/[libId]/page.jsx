"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Header from "./_components/Header";
import DisplayResult from "./_components/DisplayResult";

function SearchQueryResult() {
  const { libId } = useParams(); // e.g., "test+query"
  const searchParams = useSearchParams(); // For query params like ?type=web
  const [searchInputRecord, setSearchInputRecord] = useState(null);

  useEffect(() => {
    GetSearchQueryRecord();
  }, [libId]); // Re-run if libId changes

  const GetSearchQueryRecord = () => {
    // Decode libId and get type from query params or default to "web"
    const searchInput = libId ? decodeURIComponent(libId).replace(/\+/g, " ") : "";
    const type = searchParams.get("type") || "web";

    if (searchInput) {
      console.log("Setting searchInputRecord:", { searchInput, type }); // Debug log
      setSearchInputRecord({ searchInput, type });
    } else {
      console.warn("No search query provided in URL");
      setSearchInputRecord(null);
    }
  };

  return (
    <div className="w-full">
      <Header
        searchInputRecord={searchInputRecord}
        setSearchInputRecord={setSearchInputRecord} // Allow Header to update searchInputRecord
      />
      <div className="px-10 md:px-20 lg:px-36 xl:px-56 mt-20">
        {searchInputRecord ? (
          <DisplayResult searchInputRecord={searchInputRecord} />
        ) : (
          <p className="text-gray-500">Please enter a search query</p>
        )}
      </div>
    </div>
  );
}

export default SearchQueryResult;