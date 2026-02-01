// // import React from 'react';
// // import QuantityControl from './QuantityControl';
// // import { X, Trash2, ShoppingBag } from 'lucide-react';

// // const CartDrawer = ({ isOpen, onClose, cartItems = [], handleQuantityChange, handleRemoveItem, scrollToSection }) => {

// //   // Calculate total price automatically
// //   const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

// //   return (
// //     <>
// //       {/* 1. The Dark Backdrop */}
// //       <div
// //         className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 backdrop-blur-[5px] ${
// //           isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
// //         }`}
// //         onClick={onClose}
// //       ></div>

// //       {/* 2. The Sliding Drawer Panel */}
// //       {/* RESPONSIVE FIX: w-full on mobile, md:w-[400px] on desktop */}
// //       <div
// //         className={`fixed top-0 right-0 h-screen w-full md:w-[400px] bg-zinc-900 z-50 shadow-2xl transform transition-transform duration-300 border-l border-zinc-800 flex flex-col ${
// //           isOpen ? 'translate-x-0' : 'translate-x-full'
// //         }`}
// //       >

// //         {/* --- HEADER --- */}
// //         {/* RESPONSIVE FIX: p-4 on mobile, p-6 on desktop */}
// //         <div className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-800 bg-zinc-900">
// //           <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
// //             <ShoppingBag className="text-orange-500" size={24} />
// //             Your Cart <span className="text-sm font-normal text-gray-400">({cartItems.length})</span>
// //           </h2>
// //           <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2">
// //             <X size={24} />
// //           </button>
// //         </div>

// //         {/* --- SCROLLABLE CONTENT --- */}
// //         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">

// //           {cartItems.length === 0 ? (
// //             <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
// //               <ShoppingBag size={48} className="opacity-20" />
// //               <p>Your cart is empty.</p>
// //               <button className="text-orange-500 font-medium hover:underline"
// //                 onClick={() => {
// //                   onClose();
// //                   scrollToSection('Menu');
// //                 }}>Start Ordering </button>
// //             </div>
// //           ) : (
// //             cartItems.map((item) => (
// //               item.quantity > 0 ? (
// //                 <div key={item.id} className="flex gap-3 md:gap-4 bg-zinc-800/30 p-2 rounded-xl border border-white/5">
// //                   {/* Image: Smaller on mobile (h-16), larger on desktop (md:h-20) */}
// //                   <div className="h-20 w-20 md:h-20 md:w-20 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
// //                     <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
// //                   </div>

// //                   {/* Details */}
// //                   <div className="flex-1 flex flex-col justify-between py-1">
// //                     <div>
// //                       <h3 className="text-white font-medium line-clamp-1 text-[15px] md:text-base">{item.name}</h3>
// //                       <p className="text-sm text-gray-400">₹{item.price}</p>
// //                     </div>

// //                     <QuantityControl 
// //                         quantity={item.quantity} 
// //                         item={item} 
// //                         handleQuantityChange={handleQuantityChange} 
// //                         handleRemoveItem={handleRemoveItem} 
// //                         value={1}
// //                     />
// //                   </div>
// //                 </div>
// //               )
// //                 : null
// //             ))
// //           )}
// //         </div>

// //         {/* --- FOOTER / CHECKOUT --- */}
// //         {cartItems.length > 0 && (
// //           <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900 safe-area-bottom">
// //             <div className="flex justify-between items-center mb-4">
// //               <span className="text-gray-400 text-sm md:text-base">Subtotal</span>
// //               <span className="text-xl md:text-2xl font-bold text-white">₹{totalAmount}</span>
// //             </div>
// //             <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 md:py-4 rounded-xl transition-all shadow-lg shadow-orange-900/20 active:scale-95 text-sm md:text-base">
// //               Checkout Now
// //             </button>
// //             <p className="text-center text-[10px] md:text-xs text-gray-500 mt-3">
// //               Taxes and shipping calculated at checkout
// //             </p>
// //           </div>
// //         )}

// //       </div>
// //     </>
// //   );
// // };

// // export default CartDrawer;



// import React, { useState } from 'react';
// import QuantityControl from './QuantityControl';
// import { X, ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';

// const CartDrawer = ({ isOpen, onClose, cartItems = [], handleQuantityChange, handleRemoveItem, scrollToSection, clearCart }) => {

//   // 1. ⚠️ API CONFIGURATION (Critical)
//   const API_URL = "http://192.168.1.9:5000"; 

//   // 2. Local State for Checkout Form
//   const [view, setView] = useState('cart'); // 'cart' | 'checkout' | 'success'
//   // const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
//   // READ saved data from Login Screen
//   const savedUser = JSON.parse(localStorage.getItem("customerData")) || {};

//   const [formData, setFormData] = useState({ 
//       name: savedUser.name || '', 
//       phone: savedUser.phone || '', 
//       address: '' 
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Helper: Fix Image URLs
//   const getImageUrl = (img) => {
//       if (!img) return "https://via.placeholder.com/150";
//       return img.startsWith("http") ? img : `${API_URL}${img}`;
//   };

//   // Calculate Total
//   const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

//   // 3. HANDLE ORDER SUBMISSION
//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const orderData = {
//         customerName: formData.name,
//         phone: formData.phone,
//         address: formData.address,
//         items: cartItems,
//         totalAmount: totalAmount
//     };

//     try {
//         const response = await fetch(`${API_URL}/api/orders`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(orderData)
//         });

//         if (response.ok) {
//             setView('success');
//             // Optional: Call clearCart() here if you have that function in App.jsx
//             // clearCart(); 
//         } else {
//             alert("Order failed! Please check connection.");
//         }
//     } catch (error) {
//         console.error("Order Error:", error);
//         alert("Server error. Is the backend running?");
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <>
//       {/* Dark Backdrop */}
//       <div
//         className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 backdrop-blur-[5px] ${
//           isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//         }`}
//         onClick={onClose}
//       ></div>

//       {/* Drawer Panel */}
//       <div
//         className={`fixed top-0 right-0 h-screen w-full md:w-[400px] bg-zinc-900 z-50 shadow-2xl transform transition-transform duration-300 border-l border-zinc-800 flex flex-col ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >

//         {/* --- HEADER --- */}
//         <div className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-800 bg-zinc-900">
//           <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
//             {view === 'checkout' && (
//                 <button onClick={() => setView('cart')} className="mr-2 text-gray-400 hover:text-white">
//                     <ArrowLeft size={20} />
//                 </button>
//             )}
//             {view === 'cart' ? 'Your Cart' : view === 'checkout' ? 'Checkout' : 'Order Placed'}
//             {view === 'cart' && <span className="text-sm font-normal text-gray-400">({cartItems.length})</span>}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2">
//             <X size={24} />
//           </button>
//         </div>

//         {/* --- CONTENT AREA (Switches between Cart and Form) --- */}
//         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">

//           {/* VIEW 1: CART ITEMS */}
//           {view === 'cart' && (
//              cartItems.length === 0 ? (
//                 <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
//                     <ShoppingBag size={48} className="opacity-20" />
//                     <p>Your cart is empty.</p>
//                     <button className="text-orange-500 font-medium hover:underline"
//                         onClick={() => { onClose(); scrollToSection('Menu'); }}>
//                         Start Ordering 
//                     </button>
//                 </div>
//              ) : (
//                 cartItems.map((item) => (
//                     <div key={item.id} className="flex gap-3 md:gap-4 bg-zinc-800/30 p-2 rounded-xl border border-white/5">
//                         <div className="h-20 w-20 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
//                             <img src={getImageUrl(item.image)} alt={item.name} className="h-full w-full object-cover" />
//                         </div>
//                         <div className="flex-1 flex flex-col justify-between py-1">
//                             <div>
//                                 <h3 className="text-white font-medium line-clamp-1">{item.name}</h3>
//                                 <p className="text-sm text-gray-400">₹{item.price}</p>
//                             </div>
//                             <QuantityControl 
//                                 quantity={item.quantity} 
//                                 item={item} 
//                                 handleQuantityChange={handleQuantityChange} 
//                                 handleRemoveItem={handleRemoveItem} 
//                                 value={1}
//                             />
//                         </div>
//                     </div>
//                 ))
//              )
//           )}

//           {/* VIEW 2: CHECKOUT FORM */}
//           {view === 'checkout' && (
//               <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
//                   <div>
//                       <label className="text-sm text-gray-400">Full Name</label>
//                       <input 
//                         required
//                         type="text" 
//                         className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 mt-1 text-white focus:border-orange-500 outline-none"
//                         value={formData.name}
//                         onChange={e => setFormData({...formData, name: e.target.value})}
//                       />
//                   </div>
//                   <div>
//                       <label className="text-sm text-gray-400">Phone Number</label>
//                       <input 
//                         required
//                         type="tel" 
//                         className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 mt-1 text-white focus:border-orange-500 outline-none"
//                         value={formData.phone}
//                         onChange={e => setFormData({...formData, phone: e.target.value})}
//                       />
//                   </div>
//                   <div>
//                       <label className="text-sm text-gray-400">Delivery Address</label>
//                       <textarea 
//                         required
//                         className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 mt-1 text-white focus:border-orange-500 outline-none h-24 resize-none"
//                         value={formData.address}
//                         onChange={e => setFormData({...formData, address: e.target.value})}
//                       ></textarea>
//                   </div>

//                   {/* Order Summary in Form */}
//                   <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20 mt-4">
//                       <div className="flex justify-between text-sm mb-2">
//                           <span className="text-gray-400">Items Total</span>
//                           <span className="text-white">₹{totalAmount}</span>
//                       </div>
//                       <div className="flex justify-between text-lg font-bold">
//                           <span className="text-orange-500">To Pay</span>
//                           <span className="text-orange-500">₹{totalAmount}</span>
//                       </div>
//                   </div>
//               </form>
//           )}

//           {/* VIEW 3: SUCCESS */}
//           {view === 'success' && (
//               <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
//                   <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-black shadow-lg shadow-green-500/50">
//                       <CheckCircle size={40} />
//                   </div>
//                   <div>
//                       <h3 className="text-2xl font-bold text-white mb-2">Order Placed!</h3>
//                       <p className="text-gray-400 text-sm max-w-[250px] mx-auto">
//                         Your spicy meal is being prepared. We will call you at {formData.phone} shortly.
//                       </p>
//                   </div>
//                   <button onClick={onClose} className="bg-zinc-800 hover:bg-zinc-700 text-white py-3 px-8 rounded-full transition-colors">
//                       Close
//                   </button>
//               </div>
//           )}

//         </div>

//         {/* --- FOOTER BUTTONS --- */}
//         {cartItems.length > 0 && view !== 'success' && (
//           <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900 safe-area-bottom">
//             {view === 'cart' ? (
//                 <>
//                     <div className="flex justify-between items-center mb-4">
//                         <span className="text-gray-400">Subtotal</span>
//                         <span className="text-2xl font-bold text-white">₹{totalAmount}</span>
//                     </div>
//                     <button 
//                         onClick={() => setView('checkout')}
//                         className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-900/20 active:scale-95"
//                     >
//                         Checkout Now
//                     </button>
//                 </>
//             ) : (
//                 <button 
//                     form="checkout-form"
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     {isSubmitting ? "Placing Order..." : `Pay ₹${totalAmount} & Order`}
//                 </button>
//             )}
//           </div>
//         )}

//       </div>
//     </>
//   );
// };

// export default CartDrawer;


import React, { useState, useEffect } from 'react';
import QuantityControl from './QuantityControl';
import { X, ShoppingBag, ArrowLeft, CheckCircle, User, MapPin } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cartItems = [], handleQuantityChange, handleRemoveItem, scrollToSection, clearCart }) => {

  // ⚠️ USE YOUR LIVE URL (or Laptop IP if testing locally)
  const API_URL = "http://192.168.1.9:5000";

  const [view, setView] = useState('cart');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '' // 👈 New Field
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