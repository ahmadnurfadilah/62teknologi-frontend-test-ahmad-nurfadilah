export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const location = searchParams.get("location");
  const term = searchParams.get("term");
  const sortby = searchParams.get("sortby");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  };

  let query = `location=${location}&limit=${limit}&offset=${offset}`;
  if (term) {
    query += `&term=${term}`;
  }
  if (sortby) {
    query += `&sort_by=${sortby ?? "best_match"}`;
  }

  const res = await fetch(`https://api.yelp.com/v3/businesses/search?${query}`, options);
  const data = await res.json();

  return Response.json({ data });
}
