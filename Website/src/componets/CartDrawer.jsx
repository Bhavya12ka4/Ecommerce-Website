import React, { useState, useEffect } from 'react';
import QuantityControl from './QuantityControl';
import { X, ShoppingBag, ArrowLeft, CheckCircle, User, MapPin } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cartItems = [], handleQuantityChange, handleRemoveItem, scrollToSection, clearCart }) => {

  // ⚠️ TEMPORARY LOCAL TESTING URL
  const API_URL = import.meta.env.PROD ? "https://kook-du-ku-curries.onrender.com" : "http://localhost:5000";

  const [view, setView] = useState('cart');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    address: '',
    note: ''
  });

  const [isLoginView, setIsLoginView] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load Saved Data
  useEffect(() => {
    if (isOpen) {
      const savedUser = JSON.parse(localStorage.getItem("customerData")) || {};
      const savedAddress = localStorage.getItem("customerAddress") || '';

      setFormData({
        name: savedUser.name || '',
        phone: savedUser.phone || '',
        address: savedAddress || ''
      });

      setView('cart');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.password || (!isLoginView && !formData.name)) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    const endpoint = isLoginView ? '/api/customers/login' : '/api/customers/register';
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: formData.name, 
          phone: formData.phone, 
          password: formData.password 
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("customerData", JSON.stringify({ name: data.user.name, phone: data.user.phone }));
        setFormData(prev => ({ ...prev, name: data.user.name, phone: data.user.phone }));
        setView('checkout');
      } else {
        alert(data.error || "Authentication failed.");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Server error. Check connection.");
    }
    setIsSubmitting(false);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Safety Checks
    if (cartItems.length === 0 || totalAmount <= 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!formData.name || formData.phone.length < 10 || !formData.address) {
      alert("Please fill in all details correctly.");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      note: formData.note, // 👈 Send it to backend
      items: cartItems,
      totalAmount: totalAmount
    };

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        localStorage.setItem("customerData", JSON.stringify({ name: formData.name, phone: formData.phone }));
        localStorage.setItem("customerAddress", formData.address);
        clearCart();
        setView('success');
      } else {
        alert("Order failed! Check connection.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Server error.");
    }
    setIsSubmitting(false);
  };

  const getImageUrl = (img) => (!img ? "https://via.placeholder.com/150" : img.startsWith("http") ? img : `${API_URL}${img}`);

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 backdrop-blur-[5px] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={onClose}></div>

      {/* 📱 FIX 1: Use h-[100dvh] for perfect mobile height */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-full md:w-[400px] bg-zinc-900 z-50 shadow-2xl transform transition-transform duration-300 border-l border-zinc-800 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* HEADER (Fixed at Top) */}
        <div className="flex-none flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            {(view === 'checkout' || view === 'auth' || view === 'payment') && (
              <button
                onClick={() => {
                  if (view === 'auth') setView('cart');
                  if (view === 'checkout') setView('auth');
                  if (view === 'payment') setView('checkout');
                }}
                className="mr-2 text-gray-400 hover:text-white"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            {view === 'cart' ? 'Your Cart' : view === 'auth' ? 'Login' : view === 'checkout' ? 'Details' : view === 'payment' ? 'Payment' : 'Done'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2"><X size={24} /></button>
        </div>

        {/* CONTENT (Scrollable Middle Area) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* VIEW 1: CART */}
          {view === 'cart' && (
            cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                <ShoppingBag size={48} className="opacity-20" />
                <p>Cart is empty.</p>
                <button className="text-orange-500 font-medium" onClick={() => { onClose(); scrollToSection('Menu'); }}>Add Food</button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 bg-zinc-800/30 p-2 rounded-xl border border-white/5">
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                    <img src={getImageUrl(item.image)} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-white text-sm font-medium line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-400">₹{item.price}</p>
                    </div>
                    <QuantityControl quantity={item.quantity} item={item} handleQuantityChange={handleQuantityChange} handleRemoveItem={handleRemoveItem} value={1} />
                  </div>
                </div>
              ))
            )
          )}

          {/* Cooking Note Section */}
          <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-700/50 space-y-2">
            <label className="text-orange-500 font-bold text-sm">👩‍🍳 Cooking Note (Optional)</label>
            <textarea
              name="note"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none h-16 resize-none"
              placeholder="e.g. Extra spicy, No onions, Allergy info..."
              value={formData.note}
              onChange={handleInputChange}
            ></textarea>
          </div>
          {/* VIEW 2: AUTH FORM */}
          {view === 'auth' && (
            <form id="auth-form" onSubmit={handleAuthSubmit} className="space-y-4 pb-4">
              <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-700/50 space-y-3">
                <div className="flex items-center justify-between text-orange-500 font-bold text-sm">
                  <span className="flex items-center gap-2"><User size={16} /> {isLoginView ? "Login" : "Create Account"}</span>
                  <button type="button" onClick={() => setIsLoginView(!isLoginView)} className="text-xs text-gray-400 hover:text-white underline">
                    {isLoginView ? "Need an account? Sign Up" : "Already have one? Login"}
                  </button>
                </div>
                
                {!isLoginView && (
                  <input required type="text" name="name"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none"
                    placeholder="Your Name" value={formData.name} onChange={handleInputChange}
                  />
                )}
                <input required type="tel" name="phone"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none"
                  placeholder="Phone Number (10 digits)" value={formData.phone} onChange={handleInputChange}
                />
                <input required type="password" name="password"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none"
                  placeholder="Password" value={formData.password} onChange={handleInputChange}
                />
              </div>
            </form>
          )}

          {/* VIEW 3: CHECKOUT FORM */}
          {view === 'checkout' && (
            <form id="checkout-form" onSubmit={(e) => { e.preventDefault(); if (formData.address) setView('payment'); else alert("Enter address"); }} className="space-y-4 pb-4">
              <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-700/50 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-orange-500 font-bold text-sm">
                    <MapPin size={16} /> Delivery Address
                  </div>
                  {formData.address && (
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, address: '' }))}
                      className="text-[10px] bg-zinc-700 px-2 py-1 rounded text-gray-300"
                    >Clear</button>
                  )}
                </div>
                <textarea required name="address"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none h-20 resize-none"
                  placeholder="Room / Floor / Building..."
                  value={formData.address} onChange={handleInputChange}
                ></textarea>
              </div>
            </form>
          )}

          {/* VIEW 4: PAYMENT FORM (UPI) */}
          {view === 'payment' && (
            <div className="space-y-4 pb-4 animate-fade-in text-center">
              <div className="bg-zinc-800/50 p-6 rounded-2xl border border-orange-500/50 space-y-4">
                <h3 className="text-xl font-bold text-white">Pay via UPI</h3>
                <p className="text-gray-400 text-sm">Scan the QR code below with Google Pay, PhonePe, or Paytm.</p>

                <div className="bg-white p-4 rounded-xl inline-block shadow-lg mx-auto">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=9227090407@axl%26pn=Store%26am=${totalAmount}%26cu=INR`}
                    alt="UPI QR Code"
                    className="w-48 h-48"
                  />
                </div>

                <div className="text-2xl font-bold text-orange-500 my-4">₹{totalAmount}</div>

                <p className="text-xs text-gray-500">Or use this number manually: <span className="text-white font-mono">9227090407</span></p>

                {/* Mobile Deep Link */}
                <a
                  href={`upi://pay?pa=9227090407@axl&pn=Store&am=${totalAmount}&cu=INR`}
                  className="block md:hidden w-full bg-zinc-900 border border-zinc-700 text-white font-bold py-3 rounded-xl mt-4 active:scale-95"
                >
                  Open UPI App
                </a>
              </div>
            </div>
          )}

          {/* VIEW 3: SUCCESS */}
          {view === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Order Sent!</h3>
              <button onClick={onClose} className="bg-zinc-800 text-white py-3 px-8 rounded-full">Close</button>
            </div>
          )}
        </div>

        {/* FOOTER (Fixed at Bottom) - Always visible */}
        {cartItems.length > 0 && view !== 'success' && (
          <div className="flex-none p-4 border-t border-zinc-800 bg-zinc-900">
            {view === 'cart' ? (
              <button
                key="btn-cart"
                onClick={() => setView('auth')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
              >
                Login to Checkout • ₹{totalAmount}
              </button>
            ) : view === 'auth' ? (
              <button
                key="btn-auth"
                form="auth-form"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform disabled:opacity-50"
              >
                {isSubmitting ? "Authenticating..." : isLoginView ? "Login to Continue" : "Sign Up to Continue"}
              </button>
            ) : view === 'checkout' ? (
              <button
                key="btn-checkout"
                form="checkout-form"
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
              >
                Proceed to Payment
              </button>
            ) : view === 'payment' ? (
              <button
                key="btn-payment"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 disabled:opacity-50 transition-transform flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Processing..." : <> <CheckCircle size={20} /> I have paid ₹{totalAmount} </>}
              </button>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;