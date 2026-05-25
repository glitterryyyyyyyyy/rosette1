import React, { useState, useEffect } from 'react';
import { adminService, productService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', brand: '', size: '', images: [], soldOut: false, featured: false, badge: ''
  });
  const [uploading, setUploading] = useState(false);
  const [adminTab, setAdminTab] = useState('add'); 
  const [message, setMessage] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Define your categories here
  const categories = ["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories", "Sets", "Vintage"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productService.getAll();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    setUploading(true);
    try {
      const res = await adminService.uploadImages(formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm({ ...form, images: [...form.images, ...res.data] });
    } catch (err) {
      alert(`❌ Upload failed`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      if (currentProduct) {
        await adminService.updateProduct(currentProduct.id, form);
        showMsg('Piece updated! ✦');
      } else {
        await adminService.createProduct(form);
        showMsg('Piece published! ❀');
      }
      fetchProducts();
      resetForm();
      setAdminTab('manage');
    } catch (err) {
      alert(`❌ Save failed`);
    }
  };

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this piece? 🥺")) {
      try {
        await adminService.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        alert(`❌ Delete failed`);
      }
    }
  };

  const resetForm = () => {
    setCurrentProduct(null);
    setForm({ name: '', description: '', price: '', category: '', brand: '', size: '', images: [], soldOut: false, featured: false, badge: '' });
  };

  const colors = {
    bg: '#fef1f5', 
    card: 'rgba(255, 255, 255, 0.85)', 
    primary: '#DB7093', 
    softPink: '#fff5f7', 
    pinkBorder: '#FFB6C1', 
    inputBorder: '#FFE4E1', 
    textDark: '#5c4650', 
    textLight: '#9E7A8A', 
    white: '#ffffff'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff8fc 0%, #fff0f5 50%, #ffe8f1 100%)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .admin-card {
          animation: fadeIn 0.5s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 240, 245, 0.5); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #FFB6C1, #DB7093); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: linear-gradient(135deg, #DB7093, #FFB6C1); }
      `}</style>

      <div className="admin-card" style={{
        backgroundColor: colors.card, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: '2px solid rgba(255, 182, 193, 0.3)', borderRadius: '32px',
        width: '100%', maxWidth: '500px', height: '85vh',
        boxShadow: '0 25px 50px rgba(219, 112, 147, 0.2), 0 0 40px rgba(255, 182, 193, 0.15)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{ padding: '2rem 2rem 0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', background: 'linear-gradient(135deg, #DB7093, #FFB6C1)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, fontWeight: 700 }}>
              Boutique Admin ❀
            </h1>
            <button onClick={() => {logout(); navigate('/');}} style={{ backgroundColor: 'rgba(255, 182, 193, 0.2)', border: '2px solid #FFB6C1', width: '38px', height: '38px', borderRadius: '50%', color: colors.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', transition: 'all 0.3s', fontWeight: 700 }} onMouseEnter={(e) => {e.target.style.background = 'rgba(255, 182, 193, 0.35)'; e.target.style.transform = 'scale(1.1)';}} onMouseLeave={(e) => {e.target.style.background = 'rgba(255, 182, 193, 0.2)'; e.target.style.transform = 'scale(1)';}}>✕</button>
          </div>

          <div style={{ display: 'flex', borderBottom: `2px solid rgba(255, 182, 193, 0.3)`, marginBottom: '1.5rem', gap: '0' }}>
            <button onClick={() => setAdminTab('add')} style={{ flex: 1, padding: '1rem 0', background: 'none', border: 'none', color: adminTab === 'add' ? colors.primary : colors.textLight, fontWeight: 800, cursor: 'pointer', borderBottom: adminTab === 'add' ? `3px solid ${colors.primary}` : 'none', marginBottom: '-2px', transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', fontSize: '0.95rem' }}>
              Add Piece ❀
            </button>
            <button onClick={() => setAdminTab('manage')} style={{ flex: 1, padding: '1rem 0', background: 'none', border: 'none', color: adminTab === 'manage' ? colors.primary : colors.textLight, fontWeight: 800, cursor: 'pointer', borderBottom: adminTab === 'manage' ? `3px solid ${colors.primary}` : 'none', marginBottom: '-2px', transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', fontSize: '0.95rem' }}>
              Manage Shop ♡ ({products.length})
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '0 1.2rem', overflowY: 'auto', flex: 1 }} className="custom-scrollbar">
          {message && <div style={{ background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.2), rgba(255, 240, 245, 0.4))', color: colors.primary, padding: '1rem', borderRadius: '16px', textAlign: 'center', marginBottom: '1rem', fontWeight: 700, border: '2px solid #FFB6C1', animation: 'slide-in 0.3s ease-out' }}>{message}</div>}

          {adminTab === 'add' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem', paddingBottom: '1rem', padding: '0 0.8rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Garment Name</label>
                <input name="name" value={form.name} onChange={handleInputChange} placeholder="e.g., Vintage Pink Sweater" style={inputStyle(colors)} onFocus={(e) => {e.target.style.borderColor = colors.primary; e.target.style.boxShadow = '0 0 0 3px rgba(219, 112, 147, 0.1)';}} onBlur={(e) => {e.target.style.borderColor = colors.inputBorder; e.target.style.boxShadow = 'none';}} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ fontSize: '0.7rem', fontWeight: 800, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>BRAND</label><input name="brand" value={form.brand} onChange={handleInputChange} placeholder="Brand" style={inputStyle(colors)} onFocus={(e) => {e.target.style.borderColor = colors.primary; e.target.style.boxShadow = '0 0 0 3px rgba(219, 112, 147, 0.1)';}} onBlur={(e) => {e.target.style.borderColor = colors.inputBorder; e.target.style.boxShadow = 'none';}} /></div>
                <div><label style={{ fontSize: '0.7rem', fontWeight: 800, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>SIZE</label><input name="size" value={form.size} onChange={handleInputChange} placeholder="S / M / L" style={inputStyle(colors)} onFocus={(e) => {e.target.style.borderColor = colors.primary; e.target.style.boxShadow = '0 0 0 3px rgba(219, 112, 147, 0.1)';}} onBlur={(e) => {e.target.style.borderColor = colors.inputBorder; e.target.style.boxShadow = 'none';}} /></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>CATEGORY</label>
                  <select name="category" value={form.category} onChange={handleInputChange} style={inputStyle(colors)} onFocus={(e) => {e.target.style.borderColor = colors.primary; e.target.style.boxShadow = '0 0 0 3px rgba(219, 112, 147, 0.1)';}} onBlur={(e) => {e.target.style.borderColor = colors.inputBorder; e.target.style.boxShadow = 'none';}}>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontSize: '0.7rem', fontWeight: 800, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>PRICE (₹)</label><input name="price" type="number" value={form.price} onChange={handleInputChange} placeholder="0" style={inputStyle(colors)} onFocus={(e) => {e.target.style.borderColor = colors.primary; e.target.style.boxShadow = '0 0 0 3px rgba(219, 112, 147, 0.1)';}} onBlur={(e) => {e.target.style.borderColor = colors.inputBorder; e.target.style.boxShadow = 'none';}} /></div>
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>PIECE PHOTOS ✧</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.6rem', marginBottom: '1rem' }}>
                  <label style={{ padding: '0.8rem 1.2rem', backgroundColor: 'rgba(255, 182, 193, 0.15)', border: `2px dashed ${colors.primary}`, borderRadius: '18px', color: colors.primary, fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '0.05em' }} onMouseEnter={(e) => {e.target.style.backgroundColor = 'rgba(255, 182, 193, 0.25)'; e.target.style.transform = 'scale(1.05)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'rgba(255, 182, 193, 0.15)'; e.target.style.transform = 'scale(1)';}}>
                    {uploading ? '⏳ Uploading...' : '➕ Choose Files'}
                    <input type="file" multiple onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />
                  </label>
                  <span style={{ fontSize: '0.8rem', color: colors.textLight, fontWeight: 700 }}>{form.images.length} photo(s)</span>
                </div>
                
                {/* Image Previews Grid */}
                {form.images.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                    gap: '0.8rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 240, 245, 0.4)',
                    borderRadius: '18px',
                    border: `2px solid ${colors.pinkBorder}`,
                    marginTop: '0.8rem'
                  }}>
                    {form.images.map((img, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '1',
                          borderRadius: '14px',
                          overflow: 'hidden',
                          border: `2px solid ${colors.pinkBorder}`,
                          backgroundColor: colors.white,
                          transition: 'all 0.3s',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 8px 20px rgba(219, 112, 147, 0.3)`;
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        <img
                          src={img}
                          alt={`Upload ${idx + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            setForm({
                              ...form,
                              images: form.images.filter((_, i) => i !== idx)
                            });
                          }}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(219, 112, 147, 0.9)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(219, 112, 147, 1)';
                            e.target.style.transform = 'scale(1.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'rgba(219, 112, 147, 0.9)';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          ✕
                        </button>
                        
                        {/* Image Order Number */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '4px',
                            left: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            color: colors.primary,
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            border: `2px solid ${colors.primary}`
                          }}
                        >
                          {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', padding: '1rem', background: 'rgba(255, 182, 193, 0.08)', borderRadius: '18px', border: '2px solid rgba(255, 182, 193, 0.2)' }}>
                <label style={{ fontSize: '0.95rem', color: colors.textDark, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s' }} onMouseEnter={(e) => {e.target.style.color = colors.primary;}} onMouseLeave={(e) => {e.target.style.color = colors.textDark;}}>
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleInputChange} style={{accentColor: colors.primary, cursor: 'pointer', width: '18px', height: '18px'}} /> 
                  Featured ⭐
                </label>
                <label style={{ fontSize: '0.95rem', color: colors.textDark, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s' }} onMouseEnter={(e) => {e.target.style.color = colors.primary;}} onMouseLeave={(e) => {e.target.style.color = colors.textDark;}}>
                  <input type="checkbox" name="soldOut" checked={form.soldOut} onChange={handleInputChange} style={{accentColor: colors.primary, cursor: 'pointer', width: '18px', height: '18px'}} /> 
                  Sold Out
                </label>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1.5rem' }}>
              <div style={{ textAlign: 'center', color: colors.primary, fontWeight: 700, fontSize: '0.9rem', padding: '1rem', background: 'rgba(255, 182, 193, 0.1)', borderRadius: '18px', border: '2px solid #FFE4E1' }}>
                📦 Total Pieces: {products.length}
              </div>
              {products.map((product, idx) => (
                <div key={product.id} style={{
                  display: 'flex', alignItems: 'center', padding: '1rem',
                  backgroundColor: 'rgba(255, 240, 245, 0.6)', 
                  borderRadius: '24px', 
                  border: `2px solid ${colors.pinkBorder}`,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer',
                  animation: `slide-in 0.3s ease-out ${idx * 0.05}s backwards`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 182, 193, 0.15), rgba(255, 240, 245, 0.8))';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(219, 112, 147, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 240, 245, 0.6)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
                >
                  <img src={product.images?.[0] || 'https://via.placeholder.com/70'} alt={product.name} style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover', marginRight: '1.2rem', border: '3px solid white', boxShadow: '0 6px 15px rgba(219, 112, 147, 0.15)' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', color: colors.textDark, fontWeight: 700 }}>{product.name}</h3>
                    <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: colors.primary, fontWeight: 800 }}>₹{product.price?.toLocaleString()}</p>
                    {product.category && <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: colors.textLight, textTransform: 'capitalize' }}>{product.category}</p>}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => { setAdminTab('add'); setCurrentProduct(product); setForm(product); }} style={{ padding: '0.6rem 1.2rem', borderRadius: '999px', border: `2px solid ${colors.primary}`, backgroundColor: 'white', color: colors.primary, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '0.05em' }} onMouseEnter={(e) => {e.target.style.background = colors.primary; e.target.style.color = 'white';}} onMouseLeave={(e) => {e.target.style.background = 'white'; e.target.style.color = colors.primary;}}>Edit</button>
                    <button onClick={() => handleDelete(product.id)} style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #FFE4E1', backgroundColor: 'rgba(255, 240, 245, 0.8)', color: colors.primary, cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s', fontWeight: 700 }} onMouseEnter={(e) => {e.target.style.background = 'linear-gradient(135deg, #DB7093, #FFB6C1)'; e.target.style.color = 'white'; e.target.style.transform = 'scale(1.1)';}} onMouseLeave={(e) => {e.target.style.background = 'rgba(255, 240, 245, 0.8)'; e.target.style.color = colors.primary; e.target.style.transform = 'scale(1)';}}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {adminTab === 'add' && (
          <div style={{ padding: '1.5rem 2rem', background: 'linear-gradient(135deg, rgba(255, 240, 245, 0.6), rgba(255, 228, 225, 0.4))', borderTop: '2px solid rgba(255, 182, 193, 0.3)' }}>
            <button onClick={handleSubmit} style={{
              width: '100%', background: 'linear-gradient(135deg, #DB7093, #FFB6C1)', color: 'white', border: 'none',
              padding: '1.2rem', borderRadius: '999px', fontSize: '1rem', fontWeight: 800,
              cursor: 'pointer', boxShadow: '0 12px 30px rgba(219, 112, 147, 0.3)', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '0.05em'
            }} onMouseEnter={(e) => {e.target.style.boxShadow = '0 16px 40px rgba(219, 112, 147, 0.4)'; e.target.style.transform = 'translateY(-2px)';}} onMouseLeave={(e) => {e.target.style.boxShadow = '0 12px 30px rgba(219, 112, 147, 0.3)'; e.target.style.transform = 'translateY(0)';}}>
              {currentProduct ? 'Update Piece ✦' : 'Publish Piece ✦'}
            </button>
            <p onClick={resetForm} style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '1rem', cursor: 'pointer', color: colors.textLight, fontWeight: 700, transition: 'all 0.3s' }} onMouseEnter={(e) => {e.target.style.color = colors.primary;}} onMouseLeave={(e) => {e.target.style.color = colors.textLight;}}>
              {currentProduct ? 'Cancel Edit' : 'Clear Form ❀'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = (colors) => ({
  width: '100%', padding: '0.9rem 1.2rem', borderRadius: '18px', border: `2px solid ${colors.inputBorder}`,
  backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', color: colors.textDark, outline: 'none', boxSizing: 'border-box', marginTop: '0.4rem',
  appearance: 'none',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
});

export default AdminDashboard;