import React, { useState } from 'react';
import CartDrawer from "./CartDrawer";

function NavBarChe() {
    // 1. State for opening/closing the cart
    const [isCartOpen, setIsCartOpen] = useState(false);

    // 2. Sample Cart Data (Later you will manage this with real state)
    const sampleCart = [
        { id: 1, name: "Butter Chicken", price: 250, quantity: 2, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=200&q=80" },
        { id: 2, name: "Tandoori Roti", price: 15, quantity: 5, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=200&q=80" }
    ];

    // 3. Create the scroll handler
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <nav className="bg-black/60 backdrop-blur-sm text-lightWritingColor flex justify-around text-[15px] items-center p-1.5 fixed w-full top-0 z-30">
                <div className="flex justify-center gap-2 items-center cursor-pointer">
                    <img src="KookDukuCurriesLogo.png" className='h-15' alt="Logo" />
                    <div >
                        <div className="restoName text-BrightWritingColor font-medium">Kook Du Cu Curries</div>
                        <div className="mineDescrip text-[#818189] text-[12px]">Curries • Non-veg • Spicy</div>
                    </div>
                </div>

                <div>
                    <ol className='flex justify-center gap-5 '>
                        <li className='cursor-pointer hover:text-white/50' onClick={() => scrollToSection('Home')}>Home</li>
                        <li className='cursor-pointer hover:text-white/50' onClick={() => scrollToSection('Menu')}>Menu</li>
                        <li className='cursor-pointer hover:text-white/50' onClick={() => scrollToSection('Contant')}>Contant</li>
                    </ol>
                </div>

                <div className='flex gap-3'>
                    <button className='bg-[#2a2b2d]/80 hover:bg-white/12 p-2 rounded-full px-3 text-BrightWritingColor font-medium border border-white/10 cursor-pointer'>Order Now</button>
                    <button onClick={() => setIsCartOpen(true)} className='bg-[#2a2b2d]/80 p-2 rounded-full  hover:bg-white/12 px-3 cursor-pointer border-white/10 border ' ><img src="cart_Icon.png" alt="#" className='h-5' /></button>
                    {/* <button
                        onClick={() => setIsCartOpen(true)}
                        className="fixed top-5 right-5 z-30 bg-orange-600 p-3 rounded-full shadow-lg hover:bg-orange-700 transition">
                        🛒 Cart
                    </button> */}
                    {/* 4. Render the Cart Component */}
                    {/* <CartDrawer
                        isOpen={isCartOpen}
                        onClose={() => setIsCartOpen(false)}
                        cartItems={sampleCart}
                    />*/}
                </div>

            </nav>
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={sampleCart}
            />

        </>
    )
}

export default NavBarChe