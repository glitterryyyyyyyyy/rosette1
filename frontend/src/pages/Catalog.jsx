import React, { useEffect, useState } from 'react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Filter, X } from 'lucide-react';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const categories = ['dresses', 'tops', 'skirts', 'bottoms', 'outerwear', 'sets', 'accessories'];

  useEffect(() => {
    productService.getAll().then(res => setProducts(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (searchTerm.trim()) {
      filtered = filtered.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand?.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ 
      x: (clientX / window.innerWidth) * 2 - 1, 
      y: (clientY / window.innerHeight) * 2 - 1 
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff8fc 0%, #fff0f5 50%, #ffe8f1 100%)', position: 'relative', overflow: 'hidden' }} onMouseMove={handleMouseMove}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');             
        
        .blob-bg { position: fixed; top: -20vh; left: -10vw; width: 60vw; height: 60vw; background: radial-gradient(circle, rgba(255, 182, 193, 0.4) 0%, transparent 60%); border-radius: 50%; filter: blur(40px); pointer-events: none; z-index: 0; animation: floatBlob 10s ease-in-out infinite alternate; }
        .blob-bg-2 { position: fixed; bottom: -20vh; right: -10vw; width: 50vw; height: 50vw; background: radial-gradient(circle, rgba(219, 112, 147, 0.2) 0%, transparent 60%); border-radius: 50%; filter: blur(40px); pointer-events: none; z-index: 0; animation: floatBlob2 12s ease-in-out infinite alternate; }

        @keyframes floatBlob { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(50px, 30px) scale(1.1); } }
        @keyframes floatBlob2 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-40px, -40px) scale(1.2); } }

        .catalog-container { max-width: 1300px; margin: 0 auto; padding: 2rem 1.5rem 6rem; position: relative; z-index: 2; }
        
        .glow-text { background: linear-gradient(135deg, #DB7093, #FFB6C1, #DB7093); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shine 3s linear infinite; }
        @keyframes shine { to { background-position: 200% center; } }
      `}</style>
      
      <div className="blob-bg" style={{ transform: `translate(\${mousePos.x * 20}px, \${mousePos.y * 20}px)` }} />
      <div className="blob-bg-2" style={{ transform: `translate(\${-mousePos.x * 20}px, \${-mousePos.y * 20}px)` }} />

      <div className="catalog-container">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: 'spring' }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid rgba(255, 182, 193, 0.5)', display: 'flex', alignItems: 'center', gap: '8px', color: '#DB7093', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <Sparkles size={14} /> curated archive <Sparkles size={14} />
            </div>
          </motion.div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem,7vw,5.5rem)', lineHeight: '.95', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
            <span style={{ color: '#6d545f' }}>dreamy little</span> <br /><em className="glow-text" style={{ fontStyle: 'italic' }}>pieces</em>
          </h1>
          <p style={{ color: '#C69AAD', fontSize: '1rem', fontWeight: 600 }}>soft thrift finds for your pinterest life ♡</p>
        </motion.div>

        {/* SEARCH & FILTERS CONTAINER */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(20px)', padding: '2rem', borderRadius: '32px', border: '2px solid rgba(255, 182, 193, 0.3)', boxShadow: '0 20px 50px rgba(219, 112, 147, 0.1)', marginBottom: '4rem' }}>
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <div style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: searchFocused ? '#DB7093' : '#FFB6C1', transition: 'color 0.3s' }}>
              <Search size={20} />
            </div>
            <input type="text" placeholder="search dreamy pieces (e.g., vintage pink)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} style={{ width: '100%', padding: '1.2rem 1.8rem 1.2rem 3.5rem', borderRadius: '999px', border: searchFocused ? '2px solid #DB7093' : '2px solid #FFB6C1', background: searchFocused ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)', outline: 'none', fontSize: '1rem', color: '#6d545f', boxShadow: searchFocused ? '0 12px 35px rgba(219, 112, 147, 0.2)' : 'none', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', fontWeight: 500 }} />
            {searchTerm && (
              <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => setSearchTerm('')} style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#DB7093', cursor: 'pointer' }}>
                <X size={20} />
              </motion.button>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ color: '#DB7093', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}><Filter size={16} /> Filters:</div>
            <div style={{ display: 'flex', gap: '.8rem', overflowX: 'auto', paddingBottom: '0.5rem', flex: 1 }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedCategory('')} style={{ border: selectedCategory === '' ? 'none' : '2px solid #FFB6C1', borderRadius: '999px', padding: '.8rem 1.5rem', background: selectedCategory === '' ? 'linear-gradient(135deg, #DB7093, #FFB6C1)' : 'rgba(255, 255, 255, 0.8)', color: selectedCategory === '' ? 'white' : '#866875', cursor: 'pointer', fontWeight: 800, whiteSpace: 'nowrap', fontSize: '.85rem', letterSpacing: '.05em', boxShadow: selectedCategory === '' ? '0 8px 20px rgba(219, 112, 147, 0.3)' : 'none' }}>
                all pieces ✧
              </motion.button>
              {categories.map((cat) => (
                <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedCategory(cat)} style={{ border: selectedCategory === cat ? 'none' : '2px solid #FFB6C1', borderRadius: '999px', padding: '.8rem 1.5rem', background: selectedCategory === cat ? 'linear-gradient(135deg, #DB7093, #FFB6C1)' : 'rgba(255, 255, 255, 0.8)', color: selectedCategory === cat ? 'white' : '#866875', cursor: 'pointer', fontWeight: 800, textTransform: 'capitalize', whiteSpace: 'nowrap', fontSize: '.85rem', letterSpacing: '.05em', boxShadow: selectedCategory === cat ? '0 8px 20px rgba(219, 112, 147, 0.3)' : 'none' }}>
                  {cat} {selectedCategory === cat && '❀'}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* PRODUCTS */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '5rem 0', color: '#DB7093', fontSize: '1.2rem', fontWeight: 700 }}>
               <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ display: 'inline-block', marginBottom: '1rem' }}><Sparkles size={32} /></motion.div>
              <p>fetching the archive...</p>
            </motion.div>
          ) : filteredProducts.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ textAlign: 'center', padding: '5rem 0' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#DB7093', marginBottom: '.6rem', fontSize: '2.5rem' }}>nothing found ♡</h3>
              <p style={{ color: '#C69AAD', fontSize: '1.1rem', fontWeight: 600 }}>try another search, dreamy girl! 🌸</p>
            </motion.div>
          ) : (
            <motion.div key="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2.5rem' }} layout>
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && filteredProducts.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ textAlign: 'center', marginTop: '6rem', color: '#DB7093', fontSize: '0.95rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', padding: '1rem 2rem', borderRadius: '999px', display: 'inline-block', position: 'relative', left: '50%', transform: 'translateX(-50%)', border: '2px solid rgba(255, 182, 193, 0.4)' }}>
            ✦ showing {filteredProducts.length} dreamy pieces ✦
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
