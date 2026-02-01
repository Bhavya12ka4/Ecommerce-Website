// import React from 'react';
// import QuantityControl from './QuantityControl';
// import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

// const CartDrawer = ({ isOpen, onClose, cartItems = [], handleQuantityChange, handleRemoveItem, scrollToSection }) => {

//   // Calculate total price automatically
//   const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

//   return (
//     <>
//       {/* 1. The Dark Backdrop (Clicking this closes the drawer) */}
//       <div
//         className={`fixed inset-0 bg-black/20! z-40 transition-opacity duration-300 backdrop-blur-[5px] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//           }`}
//         onClick={onClose}
//       ></div>

//       {/* 2. The Sliding Drawer Panel */}
//       <div
//         className={`fixed top-0 right-0 h-screen w-100 bg-zinc-900 z-50 shadow-2xl transform transition-transform duration-300 border-l border-zinc-800 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
//           }`}
//       >

//         {/* --- HEADER --- */}
//         <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900">
//           <h2 className="text-xl font-bold text-white flex items-center gap-2">
//             <ShoppingBag className="text-orange-500" />
//             Your Cart <span className="text-sm font-normal text-gray-400">({cartItems.length})</span>
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
//             <X size={24} />
//           </button>
//         </div>

//         {/* --- SCROLLABLE CONTENT --- */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6">

//           {cartItems.length === 0 ? (
//             <div className="h-200 flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
//               <ShoppingBag size={48} className="opacity-20" />
//               <p>Your cart is empty.</p>
//               <button className="text-orange-500 font-medium hover:underline"
//                 onClick={() => {
//                   onClose();              // 1. Close the drawer
//                   scrollToSection('Menu'); // 2. Scroll to the menu
//                 }}>Start Ordering </button>
//             </div>
//           ) : (
//             cartItems.map((item) => (
//               item.quantity > 0 ? (
//                 <div key={item.id} className="flex gap-4">
//                   {/* Image */}
//                   <div className="h-20 w-20 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
//                     <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
//                   </div>

//                   {/* Details */}
//                   <div className="flex-1 flex flex-col justify-between">
//                     <div>
//                       <h3 className="text-white font-medium line-clamp-1">{item.name}</h3>
//                       <p className="text-sm text-gray-400">₹{item.price}</p>
//                     </div>

//                     <QuantityControl quantity={item.quantity} item={item} handleQuantityChange={handleQuantityChange} handleRemoveItem={handleRemoveItem} value={1} />
//                   </div>
//                 </div>
//               )
//                 : null
//             ))
//           )}
//         </div>

//         {/* --- FOOTER / CHECKOUT --- */}
//         {cartItems.length > 0 && (
//           <div className="p-6 border-t border-zinc-800 bg-zinc-900">
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-gray-400">Subtotal</span>
//               <span className="text-2xl font-bold text-white">₹{totalAmount}</span>
//             </div>
//             <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-900/20 active:scale-95">
//               Checkout Now
//             </button>
//             <p className="text-center text-xs text-gray-500 mt-4">
//               Taxes and shipping calculated at checkout
//             </p>
//           </div>
//         )}

//       </div>
//     </>
//   );
// };

// export default CartDrawer;

import React from 'react';
import QuantityControl from './QuantityControl';
import { X, Trash2, ShoppingBag } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cartItems = [], handleQuantityChange, handleRemoveItem, scrollToSection }) => {

  // Calculate total price automatically
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      {/* 1. The Dark Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 backdrop-blur-[5px] ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      ></div>

      {/* 2. The Sliding Drawer Panel */}
      {/* RESPONSIVE FIX: w-full on mobile, md:w-[400px] on desktop */}
      <div
        className={`fixed top-0 right-0 h-screen w-full md:w-[400px] bg-zinc-900 z-50 shadow-2xl transform transition-transform duration-300 border-l border-zinc-800 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        {/* --- HEADER --- */}
        {/* RESPONSIVE FIX: p-4 on mobile, p-6 on desktop */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-800 bg-zinc-900">
          <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="text-orange-500" size={24} />
            Your Cart <span className="text-sm font-normal text-gray-400">({cartItems.length})</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2">
            <X size={24} />
          </button>
        </div>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">

          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Your cart is empty.</p>
              <button className="text-orange-500 font-medium hover:underline"
                onClick={() => {
                  onClose();
                  scrollToSection('Menu');
                }}>Start Ordering </button>
            </div>
          ) : (
            cartItems.map((item) => (
              item.quantity > 0 ? (
                <div key={item.id} className="flex gap-3 md:gap-4 bg-zinc-800/30 p-2 rounded-xl border border-white/5">
                  {/* Image: Smaller on mobile (h-16), larger on desktop (md:h-20) */}
                  <div className="h-20 w-20 md:h-20 md:w-20 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-white font-medium line-clamp-1 text-[15px] md:text-base">{item.name}</h3>
                      <p className="text-sm text-gray-400">₹{item.price}</p>
                    </div>

                    <QuantityControl 
                        quantity={item.quantity} 
                        item={item} 
                        handleQuantityChange={handleQuantityChange} 
                        handleRemoveItem={handleRemoveItem} 
                        value={1}
                    />
                  </div>
                </div>
              )
                : null
            ))
          )}
        </div>

        {/* --- FOOTER / CHECKOUT --- */}
        {cartItems.length > 0 && (
          <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900 safe-area-bottom">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-sm md:text-base">Subtotal</span>
              <span className="text-xl md:text-2xl font-bold text-white">₹{totalAmount}</span>
            </div>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 md:py-4 rounded-xl transition-all shadow-lg shadow-orange-900/20 active:scale-95 text-sm md:text-base">
              Checkout Now
            </button>
            <p className="text-center text-[10px] md:text-xs text-gray-500 mt-3">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        )}

      </div>
    </>
  );
};

export default CartDrawer;