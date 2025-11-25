import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Initialize scrolled state based on page - case study pages always scrolled
  const [isScrolled, setIsScrolled] = useState(!isHomePage);

  useEffect(() => {
    // Immediately set scrolled state when route changes
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (!heroSection) {
        setIsScrolled(true);
        return;
      }
      const heroHeight = heroSection.offsetHeight;
      setIsScrolled(window.scrollY > heroHeight - 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#experience', label: 'Background' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#contact', label: 'Contact' },
  ];

  const scrollToSection = (e, href) => {
    if (isHomePage && href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  const navClass = "fixed top-0 w-full z-[1000] px-8 py-5 transition-all duration-300 md:px-16 " + (isScrolled ? 'bg-burgundy shadow-lg' : 'bg-transparent');

  const toggleBarBase = 'block w-6 h-0.5 bg-cream my-1 transition-all duration-300 origin-center';

  const ulClass = "list-none m-0 p-0 transition-all duration-300 " + (
    isOpen
      ? 'flex fixed top-0 right-0 w-[70%] max-w-[300px] h-screen bg-burgundy flex-col justify-center items-center gap-8 shadow-[-5px_0_15px_rgba(0,0,0,0.3)] z-[1000]'
      : 'hidden md:flex md:static md:flex-row md:w-auto md:h-auto md:bg-transparent md:shadow-none md:gap-12 md:items-center'
  );

  return (
    <nav className={navClass}>
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="font-display text-cream text-3xl font-black tracking-tight z-[1001] no-underline"
        >
          NN.
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-transparent border-none cursor-pointer p-0 w-8 h-8 z-[1001] flex flex-col justify-center"
          aria-label="Toggle menu"
        >
          <span className={toggleBarBase + (isOpen ? ' rotate-45 translate-y-[6px]' : '')} />
          <span className={toggleBarBase + (isOpen ? ' opacity-0' : '')} />
          <span className={toggleBarBase + (isOpen ? ' -rotate-45 -translate-y-[6px]' : '')} />
        </button>

        <ul className={ulClass}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                to={href}
                onClick={(e) => scrollToSection(e, href)}
                className="text-cream no-underline text-sm font-medium tracking-wider uppercase hover:opacity-70 transition-opacity"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
