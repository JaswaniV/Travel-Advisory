const COUNTRY_API = 'https://restcountries.com/v3.1';
const ADVISORY_API = 'https://www.travel-advisory.info/api';

const countryFields = 'name,cca2,flags,capital,region,subregion,population,languages,currencies';

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

export async function searchCountries(query) {
  const data = await request(`${COUNTRY_API}/name/${encodeURIComponent(query)}?fields=${countryFields}`);
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export async function getCountry(code) {
  const data = await request(`${COUNTRY_API}/alpha/${encodeURIComponent(code)}?fields=${countryFields}`);
  return Array.isArray(data) ? data[0] : data;
}

export async function getCountriesByCodes(codes) {
  const data = await request(`${COUNTRY_API}/alpha?codes=${codes.join(',')}&fields=${countryFields}`);
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export async function getAdvisories() {
  const data = await request(ADVISORY_API);
  return Object.fromEntries(
    Object.values(data.data).map((item) => [item.iso_alpha2, item]),
  );
}
