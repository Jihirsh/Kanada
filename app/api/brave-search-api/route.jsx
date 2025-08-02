import axios from "axios";

export async function POST(req) {
  const { searchInput, searchType } = await req.json();

  if (searchInput) {
    const result = await axios.get(
      "https://api.search.brave.com/res/v1/web/search?q=" + searchInput,
      {
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip",
          "X-Subscription-Token": process.env.BRAVE_API_KEY,
        },
      }
    );

    return NextResponse.json(result.data);
  } else {
    return NextResponse.json({ error: "Please pass user search query" });
  }
}
