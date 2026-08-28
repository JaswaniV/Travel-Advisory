import { Link } from 'react-router-dom';
import AdvisoryBadge from './AdvisoryBadge';
import { formatNumber } from '../utils/advisory';

export default function CountryCard({ country, advisory, isFavorite, onToggleFavorite }) {
  return (
    <article className="country-card">
      <button className={`star ${isFavorite ? 'active' : ''}`} onClick={() => onToggleFavorite(country.cca2)} aria-label={`${isFavorite ? 'Remove' : 'Add'} ${country.name.common} ${isFavorite ? 'from' : 'to'} watchlist`}>
        {isFavorite ? '★' : '☆'}
      </button>
      <Link to={`/country/${country.cca2}`} className="card-link">
        <img src={country.flags.svg} alt="" className="flag" />
        <div className="card-content">
          <AdvisoryBadge score={advisory?.score} compact />
          <h3>{country.name.common}</h3>
          <p>{country.region || 'Region unavailable'} · {formatNumber(country.population)} people</p>
        </div>
        <span className="arrow">→</span>
      </Link>
    </article>
  );
}
