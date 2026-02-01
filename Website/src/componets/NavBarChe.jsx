// import React, { useState } from 'react';
// import CartDrawer from "./CartDrawer";

// function NavBarChe({sampleCart,setSampleCart,handleQuantityChange,handleRemoveItem,scrollToSection}) {
//     // 1. State for opening/closing the cart
//     const [isCartOpen, setIsCartOpen] = useState(false);

//     return (
//         <>
//             <nav className="bg-black/60 backdrop-blur-sm text-lightWritingColor flex justify-around text-[15px] items-center p-1.5 fixed w-full top-0 z-30">
//                 <div className="flex justify-center gap-2 items-center cursor-pointer" onClick={() => scrollToSection('Home')}>
//                     <img src="KookDukuCurriesLogo.png" className='h-15' alt="Logo" />
//                     <div >
//                         <div className="restoName text-BrightWritingColor font-medium max-md:hidden">Kook Du Cu Curries</div>
//                         <div className="mineDescrip text-[#818189] text-[12px]">Curries • Non-veg • Spicy</div>
//                     </div>
//                 </div>

//                 <div>
//                     <ol className='flex justify-center gap-5 '>
//                          <button><li className='cursor-pointer hover:text-white/50' onClick={() => scrollToSection('Home')}>Home</li></button>
//                          <button><li className='cursor-pointer hover:text-white/50' onClick={() => scrollToSection('Menu')}>Menu</li></button>
//                          <button><li className='cursor-pointer hover:text-white/50' onClick={() => scrollToSection('Contant')}>Contant</li></button>
//                     </ol>
//                 </div>

//                 <div className='flex gap-3'>
//                     <button className='bg-[#2a2b2d]/80 hover:bg-white/12 p-2 rounded-full px-3 text-BrightWritingColor font-medium border border-white/10 cursor-pointer' onClick={() => setIsCartOpen(true)}>Order Now</button>
//                     <button onClick={() => setIsCartOpen(true)} className='bg-[#2a2b2d]/80 p-2 rounded-full  hover:bg-white/12 px-3 cursor-pointer border-white/10 border ' ><img src="cart_Icon.png" alt="#" className='h-5' /></button>
//                 </div>

//             </nav>
//             <CartDrawer
//                 isOpen={isCartOpen}
//                 onClose={() => setIsCartOpen(false)}
//                 cartItems={sampleCart}
//                 handleQuantityChange={handleQuantityChange}
//                 handleRemoveItem={handleRemoveItem}
//                 scrollToSection={scrollToSection}
//             />

//         </>
//     )
// }

// export default NavBarChe

import React, { useState } from 'react';
import CartDrawer from "./CartDrawer";

function NavBarChe({ sampleCart, setSampleCart, handleQuantityChange, handleRemoveItem, scrollToSection }) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            {/* 1. Added 'px-4' for side spacing on mobile */}
            {/* 2. Changed 'justify-around' to 'justify-between md:justify-around' for better mobile spacing */}
            <nav className="bg-black/60 backdrop-blur-sm text-lightWritingColor flex justify-between md:justify-around text-[15px] items-center p-3 md:p-1.5 fixed w-full top-0 z-30 transition-all">
                
                {/* --- LOGO SECTION --- */}
                <div className="flex justify-center gap-2 items-center cursor-pointer" onClick={() => scrollToSection('Home')}>
                    {/* Responsive Logo Size: h-10 on mobile, h-15 on desktop */}
                    <img src="KookDukuCurriesLogo.png" className='h-10 md:h-15 transition-all' alt="Logo" />
                    
                    {/* Hide Name & Slogan on Mobile using max-md:hidden */}
                    <div>
                        <div className="restoName text-BrightWritingColor font-medium max-md:text-[12px]">Kook Du Cu Curries</div>
                        <div className="mineDescrip text-[#818189] text-[12px] max-md:text-[1">Curries • Non-veg • Spicy</div>
                    </div>
                </div>

                {/* --- LINKS SECTION (Hidden on Mobile) --- */}
                <div className="max-md:hidden">
                    <ol className='flex justify-center gap-8'>
                        {/* Fixed HTML: Moved onClick to the <li> and removed extra <button> */}
                        <li className='cursor-pointer hover:text-white transition-colors' onClick={() => scrollToSection('Home')}>Home</li>
                        <li className='cursor-pointer hover:text-white transition-colors' onClick={() => scrollToSection('Menu')}>Menu</li>
                        <li className='cursor-pointer hover:text-white transition-colors' onClick={() => scrollToSection('Contant')}>Contact</li>
                    </ol>
                </div>

                {/* --- BUTTONS SECTION --- */}
                <div className='flex gap-3 items-center'>
                    {/* 'Order Now' button: Smaller text on mobile */}
                    <button 
                        className='bg-[#2a2b2d]/80 hover:bg-white/12 p-2 rounded-full px-4 text-BrightWritingColor text-[13px] md:text-[15px] font-medium border border-white/10 cursor-pointer transition-all active:scale-95' 
                        onClick={() => setIsCartOpen(true)}
                    >
                        Order Now
                    </button>
                    
                    {/* Cart Icon */}
                    <button 
                        onClick={() => setIsCartOpen(true)} 
                        className='bg-[#2a2b2d]/80 p-2 rounded-full hover:bg-white/12 px-3 cursor-pointer border-white/10 border transition-all active:scale-95' 
                    >
                        <img src="cart_Icon.png" alt="#" className='h-5 w-5' />
                    </button>
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