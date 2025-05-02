const API_URL = process.env.STRAPI_API_URL!;
const API_TOKEN = process.env.STRAPI_TOKEN;

export async function fetchFromStrapi(endpoint: string, query = '') {
  const res = await fetch(`${API_URL}/${endpoint}?${query}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.statusText}`);
  return res.json();
}

export async function getAlbums() {
  return fetchFromStrapi(
    'albums',
    'populate[coverImage]=true&populate[places]=true&populate[year]=true'
  );
}