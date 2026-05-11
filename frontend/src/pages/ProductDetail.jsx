import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ArrowLeft, Instagram } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    productService.getById(id)
      .then((res) => setProduct(res.data))
      .catch((err) => { console.error(err); setProduct(null); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
          <Sparkles size={28} color="#DB7093" />
        </motion.div>
        <p>Curating details ✧</p>
      </div>
    );
  }

  if (!product) {
    return <div className="loading-screen"><p>piece not found ♡</p></div>;
  }

  const images = product.images?.length > 0 ? product.images : ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000'];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className="product-page"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

        .product-page {
          min-height: 100vh;
          background: #fffcfd;
          font-family: 'Outfit', sans-serif;
          position: relative;
          color: #4a3b42;
          overflow-x: hidden;
        }

        .loading-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fffcfd;
          color: #DB7093;
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-style: italic;
          gap: 1rem;
        }

        /* --- DESKTOP LAYOUT (ONE-SCREEN FIT) --- */
        .layout-container {
          max-width: 1150px; /* Slightly tighter so it doesn't stretch too wide */
          margin: 0 auto;
          padding: 1.5rem 4rem 2rem; /* Reduced top padding */
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #DB7093;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1.5rem; /* Reduced margin */
          transition: transform 0.3s ease;
        }
        .back-link:hover { transform: translateX(-5px); }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr; /* Exact 50/50 split */
          gap: 4rem;
          align-items: center; /* Vertically centers the text with the image */
        }

        /* --- LEFT: IMAGES --- */
        .image-gallery {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .main-image-container {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: #fff;
          /* THE FIX: Calculate height based on screen, cap it so it never cuts off */
          height: calc(100vh - 240px); 
          min-height: 450px;
          max-height: 650px;
          box-shadow: 0 20px 50px rgba(219,112,147,0.06);
          border: 1px solid rgba(255,182,193,0.3);
          cursor: zoom-in;
        }

        .thumbnail-strip {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .thumbnail {
          width: 70px;
          height: 90px;
          object-fit: cover;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        /* --- RIGHT: INFO --- */
        .info-container {
          display: flex;
          flex-direction: column;
        }

        .category-tag {
          color: #c496a8;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-weight: 700;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .product-title {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; /* Slightly reduced to fit better */
          line-height: 1.1;
          color: #3b2d33;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .product-price {
          font-size: 1.6rem;
          font-weight: 700;
          color: #DB7093;
          margin-bottom: 1.5rem;
          font-family: 'Outfit', sans-serif;
        }

        .product-description {
          color: #88747d;
          line-height: 1.7;
          font-size: 1rem;
          font-weight: 300;
          margin-bottom: 2rem;
        }

        .tags-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .detail-pill {
          padding: 0.5rem 1.2rem;
          border-radius: 999px;
          background: #fff0f5;
          color: #DB7093;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          border: 1px solid rgba(255,182,193,0.4);
        }

        /* --- BUTTONS --- */
        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #DB7093, #FFB6C1);
          color: white;
          border: none;
          padding: 1.1rem;
          border-radius: 999px;
          font-weight: 800;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(219,112,147,0.25);
          transition: all 0.3s ease;
        }

        .btn-secondary {
          background: white;
          color: #DB7093;
          border: 1px solid rgba(219,112,147,0.3);
          padding: 1.1rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        /* --- MOBILE OVERRIDES --- */
        @media (max-width: 968px) {
          .layout-container { padding: 1.5rem 1.5rem; }
          .content-grid { grid-template-columns: 1fr; gap: 2rem; }
          .main-image-container { 
            height: auto; 
            aspect-ratio: 4/5; /* Reverts to ratio for mobile */
            max-height: none; 
          }
          .product-title { font-size: 2.5rem; }
        }
      `}</style>

      {/* Decorative Blur Backgrounds */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(255, 182, 193, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(219, 112, 147, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="layout-container" style={{ position: 'relative', zIndex: 10 }}>
        
        <Link to="/products" className="back-link">
          <ArrowLeft size={14} strokeWidth={2.5} /> Back to Archive
        </Link>

        <div className="content-grid">
          
          {/* LEFT: GALLERY */}
          <div className="image-gallery">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="main-image-container"
              onClick={() => setIsZoomed(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImg}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                  src={images[currentImg]} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </AnimatePresence>

              {product.badge && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#DB7093', fontWeight: 800 }}>
                  {product.badge}
                </div>
              )}

              <motion.button 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} 
                onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} 
                style={{ position: 'absolute', bottom: '1rem', right: '1rem', width: '45px', height: '45px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}
              >
                <Heart size={20} color={isLiked ? "#DB7093" : "#88747d"} fill={isLiked ? "#DB7093" : "none"} />
              </motion.button>
            </motion.div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="thumbnail-strip">
                {images.map((img, i) => (
                  <motion.img 
                    whileHover={{ y: -3 }}
                    key={i} src={img} alt="" onClick={() => setCurrentImg(i)} className="thumbnail"
                    style={{ 
                      border: currentImg === i ? '2px solid #DB7093' : '2px solid transparent',
                      opacity: currentImg === i ? 1 : 0.5 
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: INFO */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="info-container"
          >
            <div className="category-tag">
              <Sparkles size={12} /> {product.category || 'Boutique Exclusive'}
            </div>
            
            <h1 className="product-title">
              {product.name}
            </h1>
            
            <div className="product-price">
              ₹{(product.price || 0).toLocaleString()}
            </div>
            
            <p className="product-description">
              {product.description || 'A dreamy little piece curated for soft mornings, pretty days, and romantic wardrobes. Designed with careful attention to detail to make you feel completely ethereal.'}
            </p>

            <div className="tags-row">
              <span className="detail-pill">Size: {product.size || 'Universal'}</span>
              {product.brand && <span className="detail-pill">By: {product.brand}</span>}
            </div>

            <div className="action-buttons">
              {!product.soldOut ? (
                <>
                  <motion.button whileHover={{ y: -2, boxShadow: '0 15px 30px rgba(219,112,147,0.35)' }} whileTap={{ scale: 0.98 }} className="btn-primary">
                    Adopt this piece ✦
                  </motion.button>
                  <motion.button whileHover={{ background: '#fff0f5' }} whileTap={{ scale: 0.98 }} className="btn-secondary">
                    <Instagram size={16} /> View on Instagram
                  </motion.button>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '1.1rem', borderRadius: '999px', background: '#f5f5f5', color: '#a0a0a0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>
                  Sold to a lucky home ♡
                </div>
              )}
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(255, 252, 253, 0.95)', backdropFilter: 'blur(15px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', width: '90vw', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img src={images[currentImg]} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} />
              
              <button onClick={() => setIsZoomed(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', border: 'none', width: '45px', height: '45px', borderRadius: '50%', color: '#DB7093', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetail;