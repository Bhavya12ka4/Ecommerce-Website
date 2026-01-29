import React, { useState } from 'react';
import CartDrawer from "./CartDrawer";

function NavBarChe({sampleCart,setSampleCart,handleQuantityChange,handleRemoveItem,scrollToSection}) {
    // 1. State for opening/closing the cart
    const [isCartOpen, setIsCartOpen] = useState(false);

    // 2. Sample Cart Data (Later you will manage this with real state)

    // 3. Create the scroll handler
    // const scrollToSection = (sectionId) => {
    //     const element = document.getElementById(sectionId);
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };
    return (
        <>
            <nav className="bg-black/60 backdrop-blur-sm text-lightWritingColor flex justify-around text-[15px] items-center p-1.5 fixed w-full top-0 z-30">
                <div className="flex justify-center gap-2 items-center cursor-pointer" onClick={() => scrollToSection('Home')}>
                    <img src="KookDukuCurriesLogo.png" className='h-15' alt="Logo" />
                    <div >
                        <div className="restoName text-BrightWritingColor font-medium">Kook Du Cu Curries</div>
                        <div className="mineDescrip text-[#818189] text-[12px]">Curries • Non-veg • Spicy</div>
                    </div>
                </div>

                <div>
                    <ol className='flex justify-center gap-5 '>
                         <button><li className='cursor-pointer hover:text-white/50' onClick={() => scrollToSection('Home')}>Home</li></button>
                         <button><li className='cursor-pointer hover:text-white/50' onClick={() => scrollToSection('Menu')}>Menu</li></button>
                         <button><li className='cursor-pointer hover:text-white/50' onClick={() => scrollToSection('Contant')}>Contant</li></button>
                    </ol>
                </div>

                <div className='flex gap-3'>
                    <button className='bg-[#2a2b2d]/80 hover:bg-white/12 p-2 rounded-full px-3 text-BrightWritingColor font-medium border border-white/10 cursor-pointer' onClick={() => setIsCartOpen(true)}>Order Now</button>
                    <button onClick={() => setIsCartOpen(true)} className='bg-[#2a2b2d]/80 p-2 rounded-full  hover:bg-white/12 px-3 cursor-pointer border-white/10 border ' ><img src="cart_Icon.png" alt="#" className='h-5' /></button>
                </div>

            </nav>
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={sampleCart}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
                scrollToSection={scrollToSection}
            />

        </>
    )
}

export default NavBarChe