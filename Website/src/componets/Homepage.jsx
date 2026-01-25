import NavBarChe from "./NavBarChe.jsx";
import HeroPosterPage from "./HeroPosterPage.jsx";
import SmallBar from "./SmallBar.jsx";
import OrderComponets from "./OrderComponets.jsx";
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";


function Homepage() {

    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // 2. Fetch the data when the component loads
    useEffect(() => {
        fetch('http://localhost:5000/api/menu') // The URL of your backend
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

                <NavBarChe />
                <HeroPosterPage />
                <div
                    className="absolute bottom-0 left-0 w-full h-60 bg-linear-to-t from-black via-black/60 to-black/0  pointer-events-none z-20"
                ></div>
                <SmallBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} menuItems={menuItems} />


                <div className="flex flex-wrap m-15  justify-center gap-7 scroll-mt-55" id="Menu">



                    {/* This loop creates a component for every item in your database */}
                    {menuItems.filter((item) => selectedCategory === 'All' || item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()).map((item) => {
                        return (
                            < OrderComponets
                                key={item.id}
                                itemData={item} // We pass the data here
                            />
                        );

                    })}
                </div>

            </div>
        </>
    )
}

export default Homepage