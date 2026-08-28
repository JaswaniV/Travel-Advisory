import { useEffect, useMemo, useState } from 'react';
import CountryCard from '../components/CountryCard';
import { ErrorMessage, Loading } from '../components/Status';
import { getAdvisories, getCountriesByCodes, searchCountries } from '../services/countryApi';
import { advisoryMeta, popularCodes } from '../utils/advisory';

const filters = ['All', 'Normal precautions', 'Increased caution', 'Reconsider travel', 'Avoid travel'];

export default function HomePage({ favorites, onToggleFavorite }) {
  const [countries, setCountries] = useState([]);
  const [advisories, setAdvisories] = useState({});
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getCountriesByCodes(popularCodes), getAdvisories()])
      .then(([countryData, advisoryData]) => { setCountries(countryData); setAdvisories(advisoryData); })
      .catch(() => setError('We could not load destination data. Check your connection and try again.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSearch(event) {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true); setError(''); setFilter('All');
    try {
      const [results, advisoryData] = await Promise.all([searchCountries(query.trim()), Object.keys(advisories).length ? Promise.resolve(advisories) : getAdvisories()]);
      setCountries(results); setAdvisories(advisoryData);
    } catch {
      setCountries([]); setError(`No destination matched “${query.trim()}”. Try a different country name.`);
    } finally { setLoading(false); }
  }

  const displayed = useMemo(() => countries.filter((country) => {
    if (filter === 'All') return true;
    return advisoryMeta(advisories[country.cca2]?.score).level.includes(filter);
  }), [countries, advisories, filter]);

  return <>
    <section className="hero">
      <p className="eyebrow">PLAN WITH CLARITY</p>
      <h1>Know before<br /><em>you go.</em></h1>
      <p className="hero-copy">Current safety guidance and country essentials, collected in one calm place.</p>
      <form className="search-form" onSubmit={handleSearch}>
        <span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a country" aria-label="Search a country" />
        <button type="submit">Search</button>
      </form>
    </section>
    <section className="explore-section">
      <div className="section-heading"><div><p className="eyebrow">DESTINATION DIRECTORY</p><h2>{query ? `Results for “${query}”` : 'Explore destinations'}</h2></div><p className="result-count">{displayed.length} places</p></div>
      <div className="filter-row" aria-label="Filter by advisory level">{filters.map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
      {loading ? <Loading /> : error ? <ErrorMessage>{error}</ErrorMessage> : displayed.length ? <div className="country-grid">{displayed.map((country) => <CountryCard key={country.cca2} country={country} advisory={advisories[country.cca2]} isFavorite={favorites.includes(country.cca2)} onToggleFavorite={onToggleFavorite} />)}</div> : <div className="empty-state">No destinations meet this filter. Try another advisory level.</div>}
    </section>
  </>;
}
