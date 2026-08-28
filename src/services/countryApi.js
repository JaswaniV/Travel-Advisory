const COUNTRY_API = 'https://restcountries.com/v3.1';
const ADVISORY_API = 'https://www.travel-advisory.info/api';

const countryFields = 'name,cca2,flags,capital,region,subregion,population,languages,currencies';

function countryUrl(path, params = {}) {
  const url = new URL(`${COUNTRY_API}${path}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

async function request(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Unable to reach the travel data service.');
  }
}

export async function searchCountries(query) {
  const data = await request(countryUrl(`/name/${encodeURIComponent(query)}`, { fields: countryFields }));
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export async function getCountry(code) {
  const data = await request(countryUrl(`/alpha/${encodeURIComponent(code)}`, { fields: countryFields }));
  return Array.isArray(data) ? data[0] : data;
}

export async function getCountriesByCodes(codes) {
  const data = await request(countryUrl('/alpha', { codes: codes.join(','), fields: countryFields }));
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export async function getAdvisories() {
  const data = await request(ADVISORY_API);
  return Object.fromEntries(
    Object.values(data.data).map((item) => [item.iso_alpha2, item]),
  );
}
