import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import GamePage from './pages/GamePage';
import HistoryPage from './pages/HistoryPage';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-dark tracking-tighter">
          STONE<span className="text-indigo">PAPER</span>SCISSORS
        </Link>
        <div className="flex gap-8">
          <Link 
            to="/" 
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${
              isActive('/') ? 'text-indigo' : 'text-gray-400 hover:text-dark'
            }`}
          >
            Play
          </Link>
          <Link 
            to="/history" 
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${
              isActive('/history') ? 'text-indigo' : 'text-gray-400 hover:text-dark'
            }`}
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
