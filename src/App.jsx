import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import CountryPage from './pages/CountryPage';
import HomePage from './pages/HomePage';
import WatchlistPage from './pages/WatchlistPage';

export default function App() {
  const [favorites, setFavorites] = useLocalStorage('voyager-watchlist', []);
  const [theme, toggleTheme] = useTheme();
  function toggleFavorite(code) { setFavorites((items) => items.includes(code) ? items.filter((item) => item !== code) : [...items, code]); }
  return <Layout favoritesCount={favorites.length} theme={theme} toggleTheme={toggleTheme}><Routes><Route path="/" element={<HomePage favorites={favorites} onToggleFavorite={toggleFavorite} />} /><Route path="/country/:code" element={<CountryPage favorites={favorites} onToggleFavorite={toggleFavorite} />} /><Route path="/watchlist" element={<WatchlistPage favorites={favorites} onToggleFavorite={toggleFavorite} />} /></Routes></Layout>;
}
