"use client";
import React from 'react';
import { useParams } from 'next/navigation';

function SearchQueryResult() {
  const { libId } = useParams();
  console.log(libId);
  return (
    <div>SearchQueryResult</div>
  )
}

export default SearchQueryResult