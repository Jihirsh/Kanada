import { NextResponse } from "next/server";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req) {
  try {
    const { searchInput, searchType } = await req.json();

    if (!searchInput) {
      return NextResponse.json(
        { error: "Search input is required" },
        { status: 400 }
      );
    }
    if (!searchType) {
      return NextResponse.json(
        { error: "Search type is required" },
        { status: 400 }
      );
    }

    let attempts = 0;
    const maxAttempts = 3;
    const baseDelay = 1000;

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(
          `https://api.search.brave.com/res/v1/${searchType}/search?q=${encodeURIComponent(
            searchInput
          )}&count=6`,
          {
            headers: {
              Accept: "application/json",
              "Accept-Encoding": "gzip",
              "X-Subscription-Token": process.env.BRAVE_API_KEY,
            },
          }
        );

        if (response.status === 429) {
          attempts++;
          if (attempts >= maxAttempts) {
            return NextResponse.json(
              { error: "Rate limit exceeded", details: "Too many requests to Brave Search API" },
              { status: 429 }
            );
          }
          const delay = baseDelay * Math.pow(2, attempts);
          await sleep(delay);
          continue;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        //api response in string for copy pasting
        console.log("BRAVE API RESULT STRING:", JSON.stringify(data, null, 2));
        return NextResponse.json(data, { status: 200 });
      } catch (error) {
        if (error.message.includes("HTTP error! status: 429")) {
          attempts++;
          if (attempts >= maxAttempts) {
            return NextResponse.json(
              { error: "Rate limit exceeded", details: "Too many requests to Brave Search API" },
              { status: 429 }
            );
          }
          const delay = baseDelay * Math.pow(2, attempts);
          await sleep(delay);
          continue;
        }
        throw error;
      }
    }
  } catch (error) {
    console.error("Brave Search API Error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch search results", details: error.message },
      { status: 500 }
    );
  }
}