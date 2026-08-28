import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdvisoryBadge from '../components/AdvisoryBadge';
import { ErrorMessage, Loading } from '../components/Status';
import { getAdvisories, getCountry } from '../services/countryApi';
import { advisoryMeta, formatNumber } from '../utils/advisory';

export default function CountryPage({ favorites, onToggleFavorite }) {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [advisory, setAdvisory] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setCountry(null); setError('');
    Promise.all([getCountry(code), getAdvisories()])
      .then(([countryData, advisoryData]) => { setCountry(countryData); setAdvisory(advisoryData[countryData.cca2]); })
      .catch(() => setError('This destination could not be loaded. Please try again later.'));
  }, [code]);

  if (error) return <section className="page-narrow"><Link className="back-link" to="/">← Back to explore</Link><ErrorMessage>{error}</ErrorMessage></section>;
  if (!country) return <section className="page-narrow"><Loading label="Preparing your briefing…" /></section>;
  const meta = advisoryMeta(advisory?.score);
  const isFavorite = favorites.includes(country.cca2);
  const details = [
    ['Capital', country.capital?.join(', ') || 'Not listed'], ['Region', [country.region, country.subregion].filter(Boolean).join(' · ')],
    ['Population', formatNumber(country.population)], ['Currencies', Object.values(country.currencies || {}).map((item) => item.name).join(', ') || 'Not listed'],
    ['Languages', Object.values(country.languages || {}).join(', ') || 'Not listed'], ['Advisory score', advisory?.score ? `${advisory.score.toFixed(1)} / 5` : 'Unavailable'],
  ];
  return <section className="page-narrow detail-page">
    <Link className="back-link" to="/">← Back to explore</Link>
    <div className="detail-hero"><img className="detail-flag" src={country.flags.svg} alt={`${country.name.common} flag`} /><div><p className="eyebrow">DESTINATION BRIEFING</p><h1>{country.name.common}</h1><p>{country.name.official}</p></div><button className={`watch-button ${isFavorite ? 'saved' : ''}`} onClick={() => onToggleFavorite(country.cca2)}>{isFavorite ? '★ Saved to watchlist' : '☆ Save to watchlist'}</button></div>
    <div className="advisory-panel"><div><p className="eyebrow">TRAVEL ADVISORY</p><AdvisoryBadge score={advisory?.score} /><h2>{meta.summary}</h2></div><div className={`score-orb ${meta.tone}`}>{advisory?.score?.toFixed(1) ?? '—'}<span>out of 5</span></div></div>
    <div className="detail-grid">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</div>
    <p className="data-note">Advisory levels are supplied by Smartraveller and are intended as a starting point. Always check official government guidance before travelling.</p>
  </section>;
}
