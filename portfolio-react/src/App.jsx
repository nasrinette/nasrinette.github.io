import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar, CustomCursor } from './components';
import { Home, InteractiveMenuCase, GoodreadsCase, IllumilendCase, CoffeeVisCase } from './pages';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/interactive-menu" element={<InteractiveMenuCase />} />
        <Route path="/case-study/goodreads" element={<GoodreadsCase />} />
        <Route path="/case-study/illumilend" element={<IllumilendCase />} />
        <Route path="/case-study/coffee-vis" element={<CoffeeVisCase />} />
      </Routes>
    </Router>
  );
}

export default App
