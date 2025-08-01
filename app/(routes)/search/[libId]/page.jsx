"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from './_components/Header';
import DisplayResult from './_components/DisplayResult';

function SearchQueryResult() {
  const { libId } = useParams();
  const [searchInputRecord, setSearchInputRecord] = useState();

  useEffect(() => {
    GetSearchQueryRecord();
  }, [])

  const GetSearchQueryRecord = () => {
    
  }
  
  return (
    <div className="w-full">
        <Header searchInputRecord={searchInputRecord} />
        <div className="px-10 md:px-20 lg:px-36 xl:px-56 mt-20">
            <DisplayResult searchInputRecord={searchInputRecord} />
        </div>
    </div>
  )
}

export default SearchQueryResult