import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <Link
      to={`/products/${product.id}`}
      style={{
        textDecoration: 'none',
      }}
    >
      <style>{`
        @keyframes heart-beat {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(-1deg); }
          75% { transform: translateY(-4px) rotate(1deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 8px 25px rgba(219, 112, 147, 0.2); }
          50% { box-shadow: 0 15px 40px rgba(219, 112, 147, 0.35); }
        }
      `}</style>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.8rem',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered
            ? 'translateY(-12px) scale(1.02)'
            : 'translateY(0px) scale(1)',
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '24px',
            aspectRatio: '3/4',
            background: 'linear-gradient(135deg, rgba(255, 240, 245, 0.8), rgba(255, 228, 225, 0.6))',
            boxShadow: isHovered
              ? '0 20px 50px rgba(219, 112, 147, 0.35), 0 0 40px rgba(255, 182, 193, 0.25)'
              : '0 8px 25px rgba(219, 112, 147, 0.15)',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            border: '3px solid rgba(255, 182, 193, 0.3)',
          }}
        >
          <img
            src={
              isHovered &&
              product.images?.length > 1
                ? product.images[1]
                : product.images?.[0]
            }
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isHovered
                ? 'scale(1.1) rotate(2deg)'
                : 'scale(1) rotate(0deg)',
              filter: isHovered ? 'brightness(1.08)' : 'brightness(1)',
            }}
          />

          {/* DECORATIVE OVERLAY */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 182, 193, 0.15), transparent 50%)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* BADGE */}
          {(product.badge || product.soldOut) && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: product.soldOut
                  ? 'rgba(219, 112, 147, 0.9)'
                  : 'linear-gradient(135deg, #FFB3D9, #DB7093)',
                backdropFilter: 'blur(10px)',
                padding: '.5rem 1rem',
                borderRadius: '999px',
                fontSize: '.65rem',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: '#fff',
                fontWeight: 700,
                border: '2px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 6px 20px rgba(219, 112, 147, 0.3)',
                animation: isHovered ? 'bounce-soft 0.6s ease-in-out' : 'none',
              }}
            >
              {product.soldOut
                ? '✨ sold out'
                : `🌸 ${product.badge}`}
            </div>
          )}

          {/* HEART */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid white',
              background: isLiked
                ? 'linear-gradient(135deg, #FFB3D9, #DB7093)'
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              color: isLiked ? '#fff' : '#DB7093',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isLiked
                ? '0 8px 25px rgba(219, 112, 147, 0.4)'
                : '0 4px 12px rgba(0, 0, 0, 0.1)',
              animation: isLiked ? 'heart-beat 0.6s ease-in-out' : 'none',
              transform: isLiked ? 'scale(1.1)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (!isLiked) {
                e.target.style.background = 'rgba(255, 255, 255, 1)';
                e.target.style.boxShadow = '0 8px 20px rgba(219, 112, 147, 0.25)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLiked) {
                e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            {isLiked ? '♥' : '♡'}
          </button>
        </div>

        {/* INFO */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 .3rem',
          }}
        >
          {/* BRAND */}
          {product.brand && (
            <p
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D49DAE',
                marginBottom: '0.4rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
              }}
            >
              ✧ {product.brand.toUpperCase()} ✧
            </p>
          )}

          {/* NAME */}
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              color: isHovered ? '#DB7093' : '#5e4a53',
              fontSize: '1.25rem',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '0.4rem',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            {product.name}
          </h3>

          {/* SIZE */}
          {product.size && (
            <p
              style={{
                color: '#F48FB1',
                fontSize: '0.8rem',
                fontStyle: 'italic',
                marginBottom: '0.7rem',
                fontWeight: 600,
              }}
            >
              Size: {product.size}
            </p>
          )}

          {/* PRICE */}
          <p
            style={{
              color: '#DB7093',
              fontWeight: 800,
              fontSize: '1.1rem',
              marginBottom: '1.2rem',
              background: 'linear-gradient(to right, rgba(255, 182, 193, 0.15), rgba(255, 182, 193, 0.3), rgba(255, 182, 193, 0.15))',
              padding: '0.4rem 1.4rem',
              borderRadius: '999px',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: isHovered ? '0 4px 15px rgba(219, 112, 147, 0.2)' : 'none',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              letterSpacing: '0.05em',
            }}
          >
            ₹{product.price?.toLocaleString()}
          </p>

          {/* BUTTON */}
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            style={{
              width: '100%',
              border: isHovered ? '2px solid transparent' : '2px solid rgba(255, 182, 193, 0.6)',
              borderRadius: '999px',
              padding: '0.9rem 1rem',
              background: isHovered
                ? 'linear-gradient(135deg, #FF9A9E, #FECFEF)'
                : 'transparent',
              color: isHovered ? 'white' : '#DB7093',
              fontWeight: 800,
              fontSize: '0.85rem',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              boxShadow: isHovered 
                ? '0 10px 25px rgba(255, 154, 158, 0.4)' 
                : 'none',
              transform: isHovered ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
            }}
          >
            Add to Tote ✦
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;