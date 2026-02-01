import React, { useState } from 'react';
import { Lock, ChefHat } from 'lucide-react';

function AdminLogin({ onLogin }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 🔒 CHANGE THIS PASSWORD TO WHATEVER YOU WANT
        if (password === "admin123") {
            onLogin(); // Unlock the door!
        } else {
            setError(true);
            setPassword("");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl text-center">
                
                <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="text-orange-500" size={32} />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">Owner Access</h2>
                <p className="text-gray-400 text-sm mb-6">Enter your PIN to manage kitchen</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="password" 
                        placeholder="Enter PIN"
                        className={`w-full bg-black border ${error ? "border-red-500" : "border-zinc-700"} text-white p-4 rounded-xl text-center text-xl tracking-widest focus:outline-none focus:border-orange-500 transition-colors`}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                        }}
                    />
                    
                    {error && <p className="text-red-500 text-xs">Wrong Password!</p>}

                    <button 
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
                    >
                        Unlock Dashboard
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-zinc-800">
                    <a href="/" className="text-gray-500 text-sm hover:text-white flex items-center justify-center gap-2">
                         ← Back to Menu
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;