import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Sparkles, Stars, Heart } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Pieces');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const categories = [
    'All Pieces',
    'Dresses',
    'Tops',
    'Bottoms',
    'Sets',
    'Outerwear',
    'Accessories',
  ];

  useEffect(() => {
    productService
      .getAll()
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All Pieces') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ 
      x: (clientX / window.innerWidth) * 2 - 1, 
      y: (clientY / window.innerHeight) * 2 - 1 
    });
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #fff8fc 0%, #fff0f5 50%, #ffe8f1 100%)',
        minHeight: '100vh',
        overflowX: 'hidden',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative'
      }}
      onMouseMove={handleMouseMove}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');             
        * { box-sizing: border-box; }
        body { margin: 0; background: #fff8fc; }
        .serif { font-family: 'Playfair Display', serif; }

        .blob-bg {
          position: fixed;
          top: -20vh; left: -10vw;
          width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(255, 182, 193, 0.4) 0%, transparent 60%);
          border-radius: 50%;
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
          animation: floatBlob 10s ease-in-out infinite alternate;
        }

        .blob-bg-2 {
          position: fixed;
          bottom: -20vh; right: -10vw;
          width: 50vw; height: 50vw;
          background: radial-gradient(circle, rgba(219, 112, 147, 0.2) 0%, transparent 60%);
          border-radius: 50%;
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
          animation: floatBlob2 12s ease-in-out infinite alternate;
        }

        @keyframes floatBlob { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(50px, 30px) scale(1.1); } }
        @keyframes floatBlob2 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-40px, -40px) scale(1.2); } }

        .hero {
          min-height: 90vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 4rem 1.5rem; position: relative; z-index: 2;
        }

        .hero h1 {
          font-size: clamp(4rem, 10vw, 8rem);
          line-height: 0.9;
          color: #5c4650;
          margin: 0;
          text-shadow: 0 10px 30px rgba(219, 112, 147, 0.15);
        }

        .hero h1 em { 
          background: linear-gradient(135deg, #DB7093, #FFB6C1, #DB7093);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-style: italic; font-weight: 700;
          animation: shine 3s linear infinite;
        }

        @keyframes shine { to { background-position: 200% center; } }

        .collage { 
          display: flex; justify-content: center; margin-top: 4rem; position: relative; gap: 0;
          perspective: 1000px;
        }

        .collage-img {
          width: 180px; aspect-ratio: 3/4; object-fit: cover;
          border-radius: 30px; border: 8px solid rgba(255, 255, 255, 0.9);
          margin: 0 -20px; box-shadow: 0 15px 40px rgba(219, 112, 147, 0.3);
          transform-style: preserve-3d;
        }

        @media(max-width: 768px) {
          .collage-img { width: 120px; border: 4px solid white; margin: 0 -10px; }
          .hero h1 { font-size: 3.5rem; }
        }
      `}</style>

      <div className="blob-bg" style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }} />
      <div className="blob-bg-2" style={{ transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px)` }} />

      {/* HERO */}
      <motion.section className="hero" style={{ opacity: opacityHero, y: yBg }}>
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,182,193,0.8), rgba(219,112,147,0.8))',
            color: 'white', padding: '0.8rem 1.5rem', borderRadius: '999px',
            fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: '2rem', boxShadow: '0 10px 25px rgba(219, 112, 147, 0.3)',
            backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800
          }}
        >
          <Stars size={16} /> curated for dreamy girls <Stars size={16} />
        </motion.div>
        
        <motion.h1 
          className="serif"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Wear your <br />
          <motion.em
            display="inline-block"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            dreamy
          </motion.em> world.
        </motion.h1>

        <motion.div 
          className="collage"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring' }}
        >
          {products.slice(0, 5).map((p, idx) => (
            <motion.img 
              key={p.id} 
              src={p.images?.[0]} 
              alt="collage" 
              className="collage-img"
              initial={{ rotate: (idx - 2) * 5, y: Math.abs(idx - 2) * 20 }}
              animate={{ 
                rotate: [(idx - 2) * 5 - 2, (idx - 2) * 5 + 2, (idx - 2) * 5 - 2],
                y: [Math.abs(idx - 2) * 20, Math.abs(idx - 2) * 20 - 10, Math.abs(idx - 2) * 20]
              }}
              transition={{ repeat: Infinity, duration: 4 + idx, ease: 'easeInOut' }}
              whileHover={{ 
                scale: 1.15, 
                rotate: 0, 
                y: -30, 
                zIndex: 20,
                boxShadow: '0 30px 60px rgba(219, 112, 147, 0.5)'
              }}
              style={{ zIndex: 5 - Math.abs(idx - 2) }}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* BOUTIQUE SECTION */}
      <section id="shop" style={{ padding: '6rem 2rem', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Heart color="#DB7093" fill="#FFB6C1" size={24} />
          </div>
          <h2 className="serif" style={{ fontSize: '3.5rem', color: '#5d4650', margin: 0 }}>
            Aesthetic <em style={{ color: '#DB7093', fontStyle: 'italic' }}>Picks</em>
          </h2>
        </motion.div>

        {/* CATEGORY PILLS */}
        <motion.div 
          style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((item) => (
            <motion.button
              key={item}
              onClick={() => handleFilter(item)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                border: activeCategory === item ? 'none' : '2px solid #FFB6C1',
                background: activeCategory === item ? 'linear-gradient(135deg, #DB7093, #FFB6C1)' : 'rgba(255, 240, 245, 0.8)',
                color: activeCategory === item ? '#fff' : '#DB7093',
                padding: '0.8rem 1.8rem',
                borderRadius: '999px',
                fontWeight: activeCategory === item ? 800 : 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: activeCategory === item ? '0 10px 25px rgba(219, 112, 147, 0.4)' : 'none',
                backdropFilter: 'blur(10px)',
              }}
            >
              {item} {activeCategory === item && '❀'}
            </motion.button>
          ))}
        </motion.div>

        {/* PRODUCTS */}
        {loading ? (
          <div style={{ textAlign: 'center', color: '#DB7093', fontWeight: 700, fontSize: '1.2rem', padding: '4rem' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <Sparkles size={32} />
            </motion.div>
            <p>loading dreamy pieces...</p>
          </div>
        ) : (
          <motion.div 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}
            layout
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <footer style={{
        textAlign: 'center', padding: '4rem 2rem', color: '#DB7093', fontStyle: 'italic',
        fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.1em',
        background: 'linear-gradient(to top, rgba(255, 182, 193, 0.2), transparent)',
        position: 'relative', zIndex: 5
      }}>
        stay soft. stay dreamy. ✧
      </footer>
    </div>
  );
};

export default Home;