import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Crown, ArrowRight, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        /* --- CORE NAV LAYOUT --- */
        .nav-container {
          position: sticky;
          top: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 4rem;
          transition: all 0.4s ease;
        }

        .scrolled-nav {
          padding: 0.8rem 4rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 182, 193, 0.2);
        }

        /* --- DESKTOP 3-COLUMN LAYOUT --- */
        .nav-left { 
          flex: 1; 
          display: flex; 
          justify-content: flex-start; 
          align-items: center;
        }
        
        .nav-center { 
          flex: none; /* Keeps links perfectly centered */
          display: flex; 
          align-items: center; 
          gap: 3.5rem; 
        }
        
        .nav-right { 
          flex: 1; 
          display: flex; 
          justify-content: flex-end; 
          align-items: center;
        }

        .mobile-only-toggle { display: none; }

        /* --- MOBILE LAYOUT OVERRIDES --- */
        @media (max-width: 968px) {
          .nav-container { padding: 1rem 1.5rem !important; }
          .scrolled-nav { padding: 0.7rem 1.5rem !important; }
          
          /* Hide center links and right button on mobile */
          .nav-center, .nav-right { display: none !important; }
          
          /* Remove flex: 1 from logo so space-between works perfectly */
          .nav-left { flex: none; }
          
          /* Show toggle button */
          .mobile-only-toggle { 
            display: flex !important; 
            align-items: center;
            justify-content: center;
          }
        }

        /* Banner Marquee Animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Top Gradient Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #ff9a9e, #fecfef, #ff9a9e)',
        backgroundSize: '200% auto',
        padding: '6px 0',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,182,193,0.3)',
      }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 20s linear infinite' }}>
          {[1, 2, 3, 4].map((i) => (
            <span key={i} style={{ 
              fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', 
              color: 'white', textTransform: 'uppercase', padding: '0 2rem' 
            }}>
              ✦ Soft Archive ✦ Designed For The Girls ✦ Free Shipping Over ₹2000 ✦ Romanticize Your Wardrobe ✦
            </span>
          ))}
        </div>
      </div>

      <nav className={`nav-container ${scrolled ? 'scrolled-nav' : ''}`}>
        
        {/* LEFT: LOGO */}
        <div className="nav-left">
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart color="#DB7093" fill="#FFC0CB" size={26} strokeWidth={2.5} />
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem',
              fontWeight: 800,
              color: '#DB7093',
              fontStyle: 'italic',
              textShadow: '0 4px 15px rgba(219, 112, 147, 0.2)'
            }}>Rosette.</span>
          </Link>
        </div>

        {/* CENTER: DESKTOP LINKS */}
        <div className="nav-center">
          <NavLink to="/" active={location.pathname === '/'}>HOME <Sparkles size={14} style={{ display: 'inline', marginBottom: '2px' }} /></NavLink>
          <NavLink to="/products" active={location.pathname === '/products'}>THE ARCHIVE ❀</NavLink>
        </div>

        {/* RIGHT: DASHBOARD BUTTON */}
        <div className="nav-right">
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ y: -2, boxShadow: '0 10px 25px rgba(219, 112, 147, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #DB7093, #FFB6C1)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                boxShadow: '0 6px 15px rgba(219, 112, 147, 0.2)'
              }}
            >
              <Crown size={16} strokeWidth={2.5} /> DASHBOARD
            </motion.button>
          </Link>
        </div>

        {/* MOBILE TOGGLE (Hidden on Desktop) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-only-toggle"
          style={{
            background: 'none',
            border: 'none',
            color: '#DB7093',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255, 248, 252, 0.98) 0%, rgba(255, 240, 245, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              padding: '120px 40px 40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <MobileLink to="/" label="Home" icon="✧" onClick={() => setMobileMenuOpen(false)} />
              <MobileLink to="/products" label="The Archive" icon="❀" onClick={() => setMobileMenuOpen(false)} />
              <MobileLink to="/admin" label="Dashboard" icon="↗" onClick={() => setMobileMenuOpen(false)} />
            </div>
            
            <div style={{ marginTop: 'auto', textAlign: 'center', color: '#db7093', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Stay dreamy, Shreya ✧
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* --- HELPER COMPONENTS --- */

const NavLink = ({ to, children, active }) => (
  <Link to={to} style={{ textDecoration: 'none', position: 'relative' }}>
    <motion.span 
      whileHover={{ color: '#DB7093' }}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: active ? 800 : 700,
        color: active ? '#DB7093' : '#886d79',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        transition: 'color 0.3s ease'
      }}
    >
      {children}
    </motion.span>
    {active && (
      <div style={{ position: 'absolute', bottom: '-8px', left: '0', width: '100%', height: '3px', background: '#DB7093', borderRadius: '10px' }} />
    )}
  </Link>
);

const MobileLink = ({ to, label, icon, onClick }) => (
  <Link to={to} onClick={onClick} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(219, 112, 147, 0.2)', paddingBottom: '15px' }}>
    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontStyle: 'italic', color: '#333', fontWeight: 700 }}>
      {label} <span style={{ fontSize: '1.2rem', verticalAlign: 'middle', color: '#DB7093' }}>{icon}</span>
    </span>
    <ArrowRight color="#DB7093" size={28} />
  </Link>
);

export default Navbar;