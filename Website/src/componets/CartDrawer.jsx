import React, { useState, useEffect } from 'react';
import QuantityControl from './QuantityControl';
import { X, ShoppingBag, ArrowLeft, CheckCircle, User, MapPin } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cartItems = [], handleQuantityChange, handleRemoveItem, scrollToSection, clearCart }) => {

  // ⚠️ USE YOUR LIVE URL (or Laptop IP if testing locally)
  const API_URL = "https://ecommerce-website-pzib.onrender.com";

  const [view, setView] = useState('cart');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '' 
  });

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
            {view === 'checkout' && (
              <button onClick={() => setView('cart')} className="mr-2 text-gray-400 hover:text-white">
                <ArrowLeft size={20} />
              </button>
            )}
            {view === 'cart' ? 'Your Cart' : view === 'checkout' ? 'Details' : 'Done'}
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
          {/* VIEW 2: CHECKOUT FORM */}
          {view === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 pb-4">

              <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-700/50 space-y-3">
                <div className="flex items-center gap-2 text-orange-500 font-bold text-sm">
                  <User size={16} /> Personal Info
                </div>
                <input required type="text" name="name"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none"
                  placeholder="Name" value={formData.name} onChange={handleInputChange}
                />
                <input required type="tel" name="phone"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none"
                  placeholder="Phone Number" value={formData.phone} onChange={handleInputChange}
                />
              </div>

              <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-700/50 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-orange-500 font-bold text-sm">
                    <MapPin size={16} /> Address
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

              {/* Total Bill is now here in the scroll flow too, for clarity */}
              <div className="flex justify-between items-center px-2 pt-2">
                <span className="text-gray-400 text-sm">Total Amount</span>
                <span className="text-xl font-bold text-white">₹{totalAmount}</span>
              </div>
            </form>
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
                onClick={() => setView('checkout')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95"
              >
                Checkout • ₹{totalAmount}
              </button>
            ) : view === 'checkout' ? (
              <button
                key="btn-checkout"
                form="checkout-form"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : `Confirm Order - ₹${totalAmount}`}
              </button>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;