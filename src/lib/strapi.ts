// lib/strapi.ts

const STRAPI_URL = 'http://localhost:1337'; // manually set

export async function fetchFromStrapi(endpoint: string, query = '') {
  const url = `${STRAPI_URL}/api/${endpoint}${query ? `?${query}` : ''}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getAlbums() {
  return fetchFromStrapi(
    'albums',
    'populate[coverImage]=true&populate[places]=true&populate[year]=true'
  );
}


export async function getPlaces() {
  return fetchFromStrapi(
    'places',
    'populate[coverImage]=true&populate[albums][populate][coverImage]=true'
  );
}

export async function getYears() {
  return fetchFromStrapi(
    'years',
    'populate[albums][populate][coverImage]=true'
  );
}

export async function getAlbumBySlug(slug: string) {
  return fetchFromStrapi(
    `albums`,
    `filters[slug][$eq]=${slug}&populate[coverImage]=true&populate[year]=true&populate[places]=true&populate[photos]=true&populate[video]=true&populate[videoCover]=true`
  );
}

export async function getPlaceBySlug(slug: string) {
  return fetchFromStrapi(
    `places`,
    `filters[slug][$eq]=${slug}&populate[coverImage]=true&populate[albums][populate][coverImage]=true&populate[albums][populate][year]=true`
  );
}

export async function getYearBySlug(slug: string) {
  return fetchFromStrapi(
    `years`,
    `filters[slug][$eq]=${slug}&populate[albums][populate][coverImage]=true&populate[albums][populate][year]=true&populate[albums][populate][places]=true`
  );
}