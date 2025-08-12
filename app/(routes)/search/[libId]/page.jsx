"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Header from "./_components/Header";
import DisplayResult from "./_components/DisplayResult";

function SearchQueryResult() {
  const { libId } = useParams();
  const searchParams = useSearchParams();
  const [searchInputRecord, setSearchInputRecord] = useState(null);

  useEffect(() => {
    GetSearchQueryRecord();
  }, [libId, searchParams]);

  const GetSearchQueryRecord = () => {
    const searchInput = libId ? decodeURIComponent(libId) : "";
    const type = searchParams.get("type") || "web";
    if (searchInput) {
      setSearchInputRecord({ searchInput, type });
    } else {
      setSearchInputRecord(null);
    }
  };

  return (
    <div className="w-full">
      <Header
        searchInputRecord={searchInputRecord}
        setSearchInputRecord={setSearchInputRecord}
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
