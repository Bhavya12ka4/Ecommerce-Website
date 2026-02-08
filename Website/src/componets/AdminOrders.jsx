
// import React, { useState, useEffect } from 'react';
// import { CheckCircle, Clock, Flame, PackageCheck, Filter } from 'lucide-react';

// function AdminOrders() {
//     const API_URL = "http://localhost:5000"; 

//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // NEW: State to track which tab is active
//     const [activeTab, setActiveTab] = useState("Pending"); 

//     const fetchOrders = () => {
//         fetch(`${API_URL}/api/orders`)
//             .then(res => res.json())
//             .then(data => {
//                 if (Array.isArray(data)) {
//                     // We sort so newest orders are always at the top
//                     const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//                     setOrders(sortedData);
//                 } else {
//                     setOrders([]); 
//                 }
//                 setLoading(false);
//             })
//             .catch(err => setLoading(false));
//     };

//     const updateStatus = async (orderId, newStatus) => {
//         try {
//             const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ status: newStatus })
//             });

//             if (response.ok) {
//                 fetchOrders(); 
//             }
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     useEffect(() => {
//         fetchOrders();
//         const interval = setInterval(fetchOrders, 3000); 
//         return () => clearInterval(interval);
//     }, []);

//     // 1. FILTER LOGIC: Only show orders that match the active tab
//     const filteredOrders = orders.filter(order => order.status === activeTab);

//     // Helper: Counts for the tabs (e.g., Pending (3))
//     const getCount = (status) => orders.filter(o => o.status === status).length;

//     if (loading) return <div className="text-white p-10">Loading Kitchen Dashboard...</div>;

//     return (
//         <div className="min-h-screen bg-zinc-900 text-white p-6 font-sans">

//             {/* --- HEADER --- */}
//             <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-zinc-700 pb-4 gap-4">
//                 <h1 className="text-3xl font-bold text-orange-500 flex items-center gap-2">
//                     👨‍🍳 Kitchen Display
//                 </h1>
//                 <div className="flex bg-black/40 p-1 rounded-xl border border-zinc-700">
//                     {/* TABS */}
//                     {["Pending", "Cooking", "Ready", "Completed"].map((status) => (
//                         <button
//                             key={status}
//                             onClick={() => setActiveTab(status)}
//                             className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
//                                 activeTab === status 
//                                 ? "bg-orange-600 text-white shadow-lg" 
//                                 : "text-gray-400 hover:text-white hover:bg-white/5"
//                             }`}
//                         >
//                             {status}
//                             {/* Counter Badge */}
//                             <span className={`text-[10px] px-2 py-0.5 rounded-full ${
//                                 activeTab === status ? "bg-white text-orange-600" : "bg-zinc-700"
//                             }`}>
//                                 {getCount(status)}
//                             </span>
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* --- ORDER LIST --- */}
//             <div className="grid grid-cols-1 gap-6">
//                 {filteredOrders.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-20 bg-zinc-800/30 rounded-xl border border-zinc-700 border-dashed text-gray-500">
//                         <Filter size={48} className="opacity-20 mb-4"/>
//                         <p>No orders in "{activeTab}"</p>
//                     </div>
//                 ) : (
//                     filteredOrders.map((order) => (
//                         <div key={order._id} className="bg-black/40 border border-zinc-700 rounded-xl p-6 shadow-xl flex flex-col md:flex-row justify-between gap-6 animate-fade-in">

//                             {/* LEFT: Customer Info */}
//                             <div className="md:w-1/4 border-r border-zinc-800 pr-6">
//                                 <h2 className="text-xl font-bold text-white">{order.customerName}</h2>
//                                 <p className="text-orange-400 font-mono text-sm mb-2">{order.phone}</p>
//                                 <div className="text-gray-500 text-xs bg-zinc-900 p-2 rounded mb-2">
//                                     {order.address}
//                                 </div>
//                                 <div className="text-xs text-gray-600 flex items-center gap-1">
//                                     <Clock size={12}/> {new Date(order.createdAt).toLocaleTimeString()}
//                                 </div>
//                             </div>

//                             {/* MIDDLE: Food Items */}
//                             <div className="flex-1">
//                                 <ul className="space-y-2">
//                                     {order.items.map((item, index) => (
//                                         <li key={index} className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-white/5">
//                                             <div className="flex items-center gap-3">
//                                                 <span className="bg-white text-black font-bold w-6 h-6 flex items-center justify-center rounded-full text-xs">
//                                                     {item.quantity}
//                                                 </span>
//                                                 <span className="font-medium text-gray-200">{item.name}</span>
//                                             </div>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             {/* RIGHT: Action Buttons (Context Aware) */}
//                             <div className="md:w-1/4 flex flex-col gap-3 border-l border-zinc-800 pl-6 justify-center">

//                                 {/* Only show relevant button for the current tab */}
//                                 {activeTab === "Pending" && (
//                                     <button 
//                                         onClick={() => updateStatus(order._id, "Cooking")}
//                                         className="bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
//                                     >
//                                         <Flame size={18} /> Start Cooking
//                                     </button>
//                                 )}

//                                 {activeTab === "Cooking" && (
//                                     <button 
//                                         onClick={() => updateStatus(order._id, "Ready")}
//                                         className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
//                                     >
//                                         <PackageCheck size={18} /> Mark Ready
//                                     </button>
//                                 )}

//                                 {activeTab === "Ready" && (
//                                     <button 
//                                         onClick={() => updateStatus(order._id, "Completed")}
//                                         className="bg-zinc-700 hover:bg-zinc-600 text-gray-200 py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
//                                     >
//                                         <CheckCircle size={18} /> Complete Order
//                                     </button>
//                                 )}

//                                 {activeTab === "Completed" && (
//                                     <div className="text-center text-green-500 font-bold flex items-center justify-center gap-2">
//                                         <CheckCircle size={18} /> Delivered
//                                     </div>
//                                 )}

//                                 <div className="text-center mt-2 border-t border-zinc-800 pt-2">
//                                     <div className="text-xl font-bold text-white">₹{order.totalAmount}</div>
//                                 </div>
//                             </div>

//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }

// export default AdminOrders;


import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Flame, PackageCheck, Filter, Archive } from 'lucide-react';

function AdminOrders() {
    // ⚠️ USE YOUR LAPTOP IP or LIVE URL
    // const API_URL = "https://ecommerce-website-pzib.onrender.com";
    // Replace the hardcoded URL with this:
    const API_URL = window.location.origin;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Pending");

    // SMART FETCH: Only gets what is needed
    const fetchOrders = () => {
        // If we are on the "Completed" tab, ask for history. Otherwise, ask for active.
        const type = activeTab === "Completed" ? "history" : "active";

        fetch(`${API_URL}/api/orders?type=${type}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]);
                }
                setLoading(false);
            })
            .catch(err => setLoading(false));
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // Refetch whenever the tab changes (to load history only when asked)
    useEffect(() => {
        setLoading(true); // Show loading when switching tabs
        fetchOrders();

        const interval = setInterval(fetchOrders, 3000);
        return () => clearInterval(interval);
    }, [activeTab]); // 👈 Added activeTab here so it refetches on click

    // Filter the LOCAL data (visual filter)
    // Note: If type=active, 'orders' contains Pending/Cooking/Ready.
    // If type=history, 'orders' contains only Completed.
    const filteredOrders = orders.filter(order => order.status === activeTab);

    // Function to calculate counts (Only accurate for the loaded set)
    const getCount = (status) => orders.filter(o => o.status === status).length;

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6 font-sans">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-zinc-700 pb-4 gap-4">
                <h1 className="text-3xl font-bold text-orange-500 flex items-center gap-2">
                    👨‍🍳 Kitchen Display
                </h1>
                <div className="flex bg-black/40 p-1 rounded-xl border border-zinc-700">
                    {["Pending", "Cooking", "Ready", "Completed"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveTab(status)}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === status
                                ? "bg-orange-600 text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {status}
                            {/* Only show counts for active items to avoid confusion */}
                            {status !== "Completed" && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === status ? "bg-white text-orange-600" : "bg-zinc-700"
                                    }`}>
                                    {getCount(status)}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- ORDER LIST --- */}
            {loading ? (
                <div className="text-center py-20 text-gray-500">Updating Orders...</div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-zinc-800/30 rounded-xl border border-zinc-700 border-dashed text-gray-500">
                            {activeTab === "Completed" ? (
                                <>
                                    <Archive size={48} className="opacity-20 mb-4" />
                                    <p>No recently completed orders found.</p>
                                </>
                            ) : (
                                <>
                                    <Filter size={48} className="opacity-20 mb-4" />
                                    <p>No orders in "{activeTab}"</p>
                                </>
                            )}
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div key={order._id} className="bg-black/40 border border-zinc-700 rounded-xl p-6 shadow-xl flex flex-col md:flex-row justify-between gap-6 animate-fade-in">

                                {/* LEFT: Customer Info */}
                                <div className="md:w-1/4 border-r border-zinc-800 pr-6">
                                    <h2 className="text-xl font-bold text-white">{order.customerName}</h2>
                                    <p className="text-orange-400 font-mono text-sm mb-2">{order.phone}</p>
                                    <div className="text-gray-500 text-xs bg-zinc-900 p-2 rounded mb-2">
                                        {order.address}
                                    </div>
                                    <div className="text-xs text-gray-600 flex items-center gap-1">
                                        <Clock size={12} /> {new Date(order.createdAt).toLocaleTimeString()}
                                    </div>
                                    {order.note && (
                                        <div className="mt-3 bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg">
                                            <p className="text-xs text-yellow-500 font-bold uppercase mb-3">📝 Note:</p>
                                            <p className="text-sm text-gray-300 italic">"{order.note}"</p>
                                        </div>
                                    )}
                                </div>

                                {/* MIDDLE: Food Items */}
                                <div className="flex-1">
                                    <ul className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-white text-black font-bold w-6 h-6 flex items-center justify-center rounded-full text-xs">
                                                        {item.quantity}
                                                    </span>
                                                    <span className="font-medium text-gray-200">{item.name}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* RIGHT: Action Buttons */}
                                <div className="md:w-1/4 flex flex-col gap-3 border-l border-zinc-800 pl-6 justify-center">

                                    {activeTab === "Pending" && (
                                        <button
                                            onClick={() => updateStatus(order._id, "Cooking")}
                                            className="bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                                        >
                                            <Flame size={18} /> Start Cooking
                                        </button>
                                    )}

                                    {activeTab === "Cooking" && (
                                        <button
                                            onClick={() => updateStatus(order._id, "Ready")}
                                            className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                                        >
                                            <PackageCheck size={18} /> Mark Ready
                                        </button>
                                    )}

                                    {activeTab === "Ready" && (
                                        <button
                                            onClick={() => updateStatus(order._id, "Completed")}
                                            className="bg-zinc-700 hover:bg-zinc-600 text-gray-200 py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                                        >
                                            <CheckCircle size={18} /> Complete Order
                                        </button>
                                    )}

                                    {activeTab === "Completed" && (
                                        <div className="text-center text-green-500 font-bold flex items-center justify-center gap-2">
                                            <CheckCircle size={18} /> Delivered
                                        </div>
                                    )}

                                    <div className="text-center mt-2 border-t border-zinc-800 pt-2">
                                        <div className="text-xl font-bold text-white">₹{order.totalAmount}</div>
                                    </div>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminOrders;