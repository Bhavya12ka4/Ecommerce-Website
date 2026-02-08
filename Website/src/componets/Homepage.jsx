// import NavBarChe from "./NavBarChe.jsx";
// import HeroPosterPage from "./HeroPosterPage.jsx";
// import SmallBar from "./SmallBar.jsx";
// import OrderComponets from "./OrderComponets.jsx";
// import React, { useState, useEffect } from "react";
// import { Loader } from "lucide-react";
// import FooterSection from "./FooterSection.jsx";


// function Homepage() {

//     const [menuItems, setMenuItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedCategory, setSelectedCategory] = useState('All');

//     // Sample Cart Data
//     const [sampleCart, setSampleCart] = useState([
//         // { id: 59, name: "Butter Chicken", price: 250, quantity: 2, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=200&q=80" },
//         // { id: 60, name: "Tandoori Roti", price: 15, quantity: 5, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=200&q=80" }
//     ]);

//     // Function to handle adding items to the cart
//     const handleAddToCart = (itemData) => {
//         setSampleCart((prevCart) => {
//             const existingItem = prevCart.find((item) => item.id === itemData.id);
//             const currentQuatity = existingItem ? existingItem.quantity : 0;
//             console.log("Adding to cart:", itemData);

//             if (existingItem) {
//                 return prevCart.map((item) =>
//                     item.id === itemData.id
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                 );
//             } else {
//                 const newItem = {
//                     id: itemData.id,
//                     name: itemData.name,
//                     price: itemData.price,
//                     quantity: 1,
//                     image: itemData.image
//                 };
//                 return [...prevCart, newItem];
//             }
//         });
//     };

//     // Scroll to section function
//     const scrollToSection = (sectionId) => {
//         const element = document.getElementById(sectionId);
//         if (element) {
//             element.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     // Function to handle quantity change
//     const handleQuantityChange = (itemId, delta) => {
//         setSampleCart((prevCart) => {
//             return prevCart.map((item) =>
//                 item.id === itemId
//                     ? { ...item, quantity: Math.max(0, item.quantity + delta) }
//                     : item
//             );
//         });
//     }

//     // Function to handle item removal
//     const handleRemoveItem = (itemId) => {
//         setSampleCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
//     }

//     // Fetch the data when the component loads
//     useEffect(() => {
//         fetch('/api/menu') // The URL of your backend
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch menu data');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setMenuItems(data); // Store the data in state
//                 setLoading(false);  // Stop loading
//             })
//             .catch((err) => {
//                 console.error("Error fetching data:", err);
//                 setError(err.message);
//                 setLoading(false);
//             });
//     }, []);

//     // Show loading or error states
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center text-white">
//                 <Loader className="animate-spin mr-2" /> Loading Menu...
//             </div>
//         );
//     }
//     if (error) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
//                 Error: {error}
//             </div>
//         );
//     }


//     return (
//         <>
//             <div className="h-auto bg-black">

//                 <NavBarChe 
//                     sampleCart={sampleCart} 
//                     setSampleCart={setSampleCart} 
//                     handleQuantityChange={handleQuantityChange} 
//                     handleRemoveItem={handleRemoveItem} 
//                     scrollToSection={scrollToSection}/>
//                 <HeroPosterPage scrollToSection={scrollToSection}/>
//                 {/* <div
//                     className="absolute bottom-0 left-0 w-full h-60 bg-linear-to-t from-black via-black/60 to-black/0  pointer-events-none z-20"
//                 ></div> */}

//                 {/* <div className="absolute bottom-0 left-0 w-full h-60 bg-linear-to-t from-black via-black/60 to-black/0 pointer-events-none z-20"></div> */}
//                 <SmallBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} menuItems={menuItems} />


//                 <div className="flex flex-wrap m-5 md:m-15 justify-center gap-7 scroll-mt-85  md:scroll-mt-55" id="Menu">
//                     {/* This loop creates a component for every item in your database */}
//                     {menuItems.filter((item) => selectedCategory === 'All' || item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()).map((item) => {
//                         const existingItem = sampleCart.find((item1) => item1.id === item.id);
//                         const currentQuatity = existingItem ? existingItem.quantity : 0;
//                         return (
//                             < OrderComponets
//                                 key={item.id}
//                                 itemData={item} // We pass the data here
//                                 addToCart={handleAddToCart}
//                                 currentQuatity={currentQuatity}
//                                 handleQuantityChange={handleQuantityChange}
//                                 handleRemoveItem={handleRemoveItem} 
//                             />
//                         );

//                     })}
//                 </div>
//                 <FooterSection />

//             </div>
//         </>
//     )
// }

// export default Homepage


import NavBarChe from "./NavBarChe.jsx";
import HeroPosterPage from "./HeroPosterPage.jsx";
import SmallBar from "./SmallBar.jsx";
import OrderComponets from "./OrderComponets.jsx";
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import FooterSection from "./FooterSection.jsx";

function Homepage() {
    // ⚠️ CRITICAL: Must match your computer's IP for phone testing
    const API_URL = "https://ecommerce-website-pzib.onrender.com"; 

    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Start with an Empty Cart
    const [sampleCart, setSampleCart] = useState([]);

    // --- CART LOGIC ---
    const handleAddToCart = (itemData) => {
        setSampleCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === itemData.id);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === itemData.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...itemData, quantity: 1 }];
            }
        });
    };

// --- HANDLE QUANTITY CHANGE (Auto-Remove if 0) ---
  const handleQuantityChange = (id, change) => {
    setSampleCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          // If quantity becomes 0 or less, mark it for removal
          return { ...item, quantity: newQuantity }; 
        }
        return item;
      })
      // 🚀 MAGIC FIX: This filter removes any item with 0 quantity immediately
      .filter((item) => item.quantity > 0);
    });
  };

    const handleRemoveItem = (itemId) => {
        setSampleCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    }

    // --- SCROLL LOGIC ---
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- FETCH MENU FROM DATABASE ---
    useEffect(() => {
        fetch(`${API_URL}/api/menu`) // ✅ Uses the correct backend IP
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch menu data and I love you');
                }
                return response.json();
            })
            .then((data) => {
                setMenuItems(data); 
                setLoading(false);  
            })
            .catch((err) => {
                console.error("Error fetching data: And I hate you: ", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // --- LOADING STATE ---
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <Loader className="animate-spin mr-2 text-orange-500" /> 
                <span className="text-xl font-bold">Loading Menu...</span>
            </div>
        );
    }

    // --- ERROR STATE ---
    if (error) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-500 gap-4">
                <div className="text-xl">Error: {error}</div>
                <div className="text-gray-400 text-sm">Is the backend server running?</div>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-zinc-800 text-white px-4 py-2 rounded-lg hover:bg-zinc-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="h-auto bg-black min-h-screen flex flex-col">
            
            {/* Navigation & Cart */}
            <NavBarChe 
                sampleCart={sampleCart} 
                setSampleCart={setSampleCart} 
                handleQuantityChange={handleQuantityChange} 
                handleRemoveItem={handleRemoveItem} 
                scrollToSection={scrollToSection}
                clearCart={() => setSampleCart([])}
            />

            <HeroPosterPage scrollToSection={scrollToSection}/>

            {/* Category Filter Bar */}
            <SmallBar 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                menuItems={menuItems} 
            />

            {/* --- MENU GRID --- */}
            <div className="flex flex-wrap m-5 md:m-15 justify-center gap-7 md:scroll-mt-60 scroll-mt-85" id="Menu">
                {menuItems
                    .filter((item) => selectedCategory === 'All' || item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase())
                    .map((item) => {
                        // Check if item is already in cart to show quantity
                        const existingItem = sampleCart.find((cartItem) => cartItem.id === item.id);
                        const currentQuantity = existingItem ? existingItem.quantity : 0;
                        
                        return (
                            <OrderComponets
                                key={item._id} // MongoDB uses _id, not id
                                itemData={item}
                                addToCart={handleAddToCart}
                                currentQuatity={currentQuantity}
                                handleQuantityChange={handleQuantityChange}
                                handleRemoveItem={handleRemoveItem} 
                            />
                        );
                })}
            </div>

            <FooterSection />
        </div>
    )
}

export default Homepage;