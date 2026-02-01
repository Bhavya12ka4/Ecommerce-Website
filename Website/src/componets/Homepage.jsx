import NavBarChe from "./NavBarChe.jsx";
import HeroPosterPage from "./HeroPosterPage.jsx";
import SmallBar from "./SmallBar.jsx";
import OrderComponets from "./OrderComponets.jsx";
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import FooterSection from "./FooterSection.jsx";


function Homepage() {

    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Sample Cart Data
    const [sampleCart, setSampleCart] = useState([
        // { id: 59, name: "Butter Chicken", price: 250, quantity: 2, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=200&q=80" },
        // { id: 60, name: "Tandoori Roti", price: 15, quantity: 5, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=200&q=80" }
    ]);

    // Function to handle adding items to the cart
    const handleAddToCart = (itemData) => {
        setSampleCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === itemData.id);
            const currentQuatity = existingItem ? existingItem.quantity : 0;
            console.log("Adding to cart:", itemData);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === itemData.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                const newItem = {
                    id: itemData.id,
                    name: itemData.name,
                    price: itemData.price,
                    quantity: 1,
                    image: itemData.image
                };
                return [...prevCart, newItem];
            }
        });
    };

    // Scroll to section function
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Function to handle quantity change
    const handleQuantityChange = (itemId, delta) => {
        setSampleCart((prevCart) => {
            return prevCart.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                    : item
            );
        });
    }

    // Function to handle item removal
    const handleRemoveItem = (itemId) => {
        setSampleCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    }

    // Fetch the data when the component loads
    useEffect(() => {
        fetch('/api/menu') // The URL of your backend
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch menu data');
                }
                return response.json();
            })
            .then((data) => {
                setMenuItems(data); // Store the data in state
                setLoading(false);  // Stop loading
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Show loading or error states
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <Loader className="animate-spin mr-2" /> Loading Menu...
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
                Error: {error}
            </div>
        );
    }


    return (
        <>
            <div className="h-auto bg-black">

                <NavBarChe 
                    sampleCart={sampleCart} 
                    setSampleCart={setSampleCart} 
                    handleQuantityChange={handleQuantityChange} 
                    handleRemoveItem={handleRemoveItem} 
                    scrollToSection={scrollToSection}/>
                <HeroPosterPage scrollToSection={scrollToSection}/>
                {/* <div
                    className="absolute bottom-0 left-0 w-full h-60 bg-linear-to-t from-black via-black/60 to-black/0  pointer-events-none z-20"
                ></div> */}

                {/* <div className="absolute bottom-0 left-0 w-full h-60 bg-linear-to-t from-black via-black/60 to-black/0 pointer-events-none z-20"></div> */}
                <SmallBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} menuItems={menuItems} />


                <div className="flex flex-wrap m-5 md:m-15 justify-center gap-7 scroll-mt-85  md:scroll-mt-55" id="Menu">
                    {/* This loop creates a component for every item in your database */}
                    {menuItems.filter((item) => selectedCategory === 'All' || item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()).map((item) => {
                        const existingItem = sampleCart.find((item1) => item1.id === item.id);
                        const currentQuatity = existingItem ? existingItem.quantity : 0;
                        return (
                            < OrderComponets
                                key={item.id}
                                itemData={item} // We pass the data here
                                addToCart={handleAddToCart}
                                currentQuatity={currentQuatity}
                                handleQuantityChange={handleQuantityChange}
                                handleRemoveItem={handleRemoveItem} 
                            />
                        );

                    })}
                </div>
                <FooterSection />

            </div>
        </>
    )
}

export default Homepage