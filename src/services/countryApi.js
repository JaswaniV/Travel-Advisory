const COUNTRY_API = 'https://countries.dev';
// The former travel-advisory.info endpoint currently presents an invalid TLS
// certificate. This CORS-enabled public feed provides the same ISO alpha-2 lookup.
const ADVISORY_API = 'https://smartraveller.kevle.xyz/api/advisories';

function normalizeCountry(country) {
  return {
    name: { common: country.name, official: country.name },
    cca2: country.alpha2Code,
    flags: country.flags,
    capital: country.capital ? [country.capital] : [],
    region: country.region,
    subregion: country.subregion,
    population: country.population,
    languages: Object.fromEntries(
      (country.languages || []).map((language) => [language.iso639_1, language.name]),
    ),
    currencies: Object.fromEntries(
      (country.currencies || []).map((currency) => [currency.code, currency]),
    ),
  };
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
  const data = await request(`${COUNTRY_API}/name/${encodeURIComponent(query)}`);
  return data.map(normalizeCountry).sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export async function getCountry(code) {
  const data = await request(`${COUNTRY_API}/alpha/${encodeURIComponent(code)}`);
  return normalizeCountry(data);
}

export async function getCountriesByCodes(codes) {
  const data = await Promise.all(codes.map(getCountry));
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export async function getAdvisories() {
  const data = await request(ADVISORY_API);
  return Object.fromEntries(
    data.advisories.map((item) => [
      item.country.alpha2,
      {
        score: item.level - 1,
        message: item.latestUpdate,
        updated: item.published,
        source: item.pageUrl,
      },
    ]),
  );
}
