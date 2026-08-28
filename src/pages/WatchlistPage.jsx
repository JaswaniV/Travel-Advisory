import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { ErrorMessage, Loading } from '../components/Status';
import { getAdvisories, getCountriesByCodes } from '../services/countryApi';

export default function WatchlistPage({ favorites, onToggleFavorite }) {
  const [countries, setCountries] = useState([]); const [advisories, setAdvisories] = useState({}); const [error, setError] = useState('');
  useEffect(() => { if (!favorites.length) return; Promise.all([getCountriesByCodes(favorites), getAdvisories()]).then(([items, scores]) => { setCountries(items); setAdvisories(scores); }).catch(() => setError('Your saved destinations could not be loaded.')); }, [favorites]);
  return <section className="page-narrow watchlist-page"><p className="eyebrow">YOUR TRAVEL LIST</p><h1>Watchlist</h1><p className="page-intro">Keep an eye on the places that matter to your next journey.</p>{!favorites.length ? <div className="empty-state">Your watchlist is waiting for its first destination.<br /><Link to="/">Explore countries →</Link></div> : error ? <ErrorMessage>{error}</ErrorMessage> : !countries.length ? <Loading label="Loading your saved destinations…" /> : <div className="country-grid">{countries.map((country) => <CountryCard key={country.cca2} country={country} advisory={advisories[country.cca2]} isFavorite={true} onToggleFavorite={onToggleFavorite} />)}</div>}</section>;
}
