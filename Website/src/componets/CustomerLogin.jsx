import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

function CustomerLogin({ onLogin }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && phone.length >= 10) {
            // Save details to "Memory" so we can use them at Checkout
            const userData = { name, phone };
            localStorage.setItem("customerData", JSON.stringify(userData));
            
            // Tell App.jsx we are ready
            onLogin(userData);
        } else {
            alert("Please enter a valid Name and Phone Number.");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center relative">
            {/* Dark Overlay so text is readable */}
            <div className="absolute inset-0 bg-black/80"></div>

            <div className="relative z-10 bg-zinc-900/90 border border-zinc-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl backdrop-blur-sm text-center">
                
                <div className="bg-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-600/20">
                    <UtensilsCrossed className="text-white" size={40} />
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">Welcome!</h1>
                <p className="text-gray-400 text-sm mb-8">Please enter your details to view the menu.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-left">
                        <label className="text-xs text-gray-500 ml-1">Your Name</label>
                        <input 
                            type="text" 
                            required
                            placeholder="e.g. Bhavya Patel"
                            className="w-full bg-black border border-zinc-700 text-white p-4 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="text-left">
                        <label className="text-xs text-gray-500 ml-1">Phone Number</label>
                        <input 
                            type="tel" 
                            required
                            placeholder="e.g. 9876543210"
                            className="w-full bg-black border border-zinc-700 text-white p-4 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-900/30 mt-4"
                    >
                        Start Ordering →
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CustomerLogin;