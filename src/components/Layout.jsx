import { Link, NavLink } from 'react-router-dom';

export default function Layout({ children, favoritesCount, theme, toggleTheme }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Voyager home">
          <span className="brand-mark">✦</span> voyager
        </Link>
        <nav aria-label="Main navigation">
          <NavLink to="/">Explore</NavLink>
          <NavLink to="/watchlist">Watchlist <span className="count">{favoritesCount}</span></NavLink>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">
          {theme === 'light' ? '☾ Dark' : '☀ Light'}
        </button>
      </header>
      <main>{children}</main>
      <footer>Built for more informed journeys · Advisory data is informational and may change.</footer>
    </div>
  );
}
