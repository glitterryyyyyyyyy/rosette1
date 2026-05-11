import React, { useState } from 'react';
import { adminService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  // Matched exactly to your aesthetic reference image
  const colors = {
    bg: '#fef1f5',          // Soft, solid pastel pink background
    card: '#ffffff',        // Opaque white card
    primary: '#d06482',     // Mauvey-pink text & button
    primaryHover: '#c05773',
    softPink: '#fae6ec',    // Close button background
    inputBorder: '#fadbe6', // Soft pink border for inputs
    textDark: '#4a363b',    // Deep plum/brown for headings
    textLight: '#a68a92',   // Muted italic text
    errorBg: '#fff0f5',
    errorText: '#c97f9d'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await adminService.login({ email, password });
      if (res.data && res.data.token) {
        login(res.data.token);
        navigate('/admin');
      } else {
        setError('Something went wrong 🥺');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Invalid credentials 🥀';
      setError(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      backgroundColor: colors.bg,
      zIndex: 1000,
      fontFamily: "'Outfit', 'Quicksand', sans-serif"
    }}>
      
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        backgroundColor: colors.card,
        borderRadius: '32px',
        padding: '3.5rem 3rem',
        // This shadow creates that glossy, glowing floating effect
        boxShadow: '0 25px 50px -12px rgba(212, 106, 132, 0.15), 0 10px 30px -5px rgba(212, 106, 132, 0.08)',
        animation: 'fadeUp 0.5s ease-out'
      }}>
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            backgroundColor: colors.softPink,
            border: 'none',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            color: colors.primary,
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)'; e.target.style.backgroundColor = '#f3d9e0'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.backgroundColor = colors.softPink; }}
          title="Return to Shop"
        >
          ✕
        </button>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{
            color: colors.primary,
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '0.8rem'
          }}>
            rosette archive ❀
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.8rem',
            color: colors.textDark,
            lineHeight: 1.1,
            margin: '0 0 0.8rem 0',
            fontWeight: 600
          }}>
            Secret <br /> Access
          </h1>

          <p style={{
            margin: 0,
            color: colors.textLight,
            fontSize: '0.95rem',
            fontStyle: 'italic'
          }}>
            enter your dreamy dashboard ✧
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div style={{
            backgroundColor: colors.errorBg,
            color: colors.errorText,
            padding: '1rem',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            textAlign: 'center',
            border: `1px solid ${colors.inputBorder}`
          }}>
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1.1rem 1.5rem',
                borderRadius: '999px',
                border: `2px solid ${colors.inputBorder}`,
                backgroundColor: '#ffffff',
                outline: 'none',
                fontSize: '0.95rem',
                color: colors.textDark,
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = colors.primary}
              onBlur={(e) => e.target.style.borderColor = colors.inputBorder}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1.1rem 1.5rem',
                borderRadius: '999px',
                border: `2px solid ${colors.inputBorder}`,
                backgroundColor: '#ffffff',
                outline: 'none',
                fontSize: '0.95rem',
                color: colors.textDark,
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = colors.primary}
              onBlur={(e) => e.target.style.borderColor = colors.inputBorder}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.8rem',
              border: 'none',
              borderRadius: '999px',
              padding: '1.2rem',
              backgroundColor: loading ? colors.inputBorder : colors.primary,
              color: 'white',
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '0.03em',
              cursor: loading ? 'wait' : 'pointer',
              transition: 'all 0.3s ease',
              // This shadow gives the button that elevated, clickable glossy vibe
              boxShadow: loading ? 'none' : '0 8px 25px rgba(208, 100, 130, 0.35)',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.backgroundColor = colors.primaryHover;
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.backgroundColor = colors.primary;
              }
            }}
          >
            {loading ? 'Entering... 🌸' : 'Enter Dashboard ✦'}
          </button>
        </form>
      </div>

      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          /* Ensures placeholders match your exact aesthetic */
          ::placeholder {
            color: #d1b8c0;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default Login;