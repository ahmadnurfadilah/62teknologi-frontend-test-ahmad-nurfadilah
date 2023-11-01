export async function GET(request, { params }) {
  const id = params.id;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  };

  const res = await fetch(`https://api.yelp.com/v3/businesses/${id}`, options);
  const data = await res.json();

  return Response.json({ data });
}
