export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  };

  const res = await fetch(`https://api.yelp.com/v3/businesses/search?location=${location}&sort_by=best_match&limit=20`, options);
  const data = await res.json();

  return Response.json({ data });
}