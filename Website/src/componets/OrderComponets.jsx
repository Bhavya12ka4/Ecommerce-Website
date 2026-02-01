// // import React from 'react'
// // import QuantityControl from './QuantityControl';


// // // 1. Fixed typo: changed 'iteamData' to 'itemData'
// // function OrderComponets({ itemData, addToCart, currentQuatity ,handleQuantityChange,handleRemoveItem}) 
// // {

// //     const spiceIcons = {
// //         "Mild": "🌶️",
// //         "Medium": "🌶️🌶️",
// //         "Hot": "🌶️🌶️🌶️"
// //     };


// //     // Safety check: If data hasn't loaded yet, don't break the app
// //     if (!itemData) return null;

// //     return (
// //         <>
// //             <div className="border bg-BrightWritingColor/10 border-white/10 rounded-[15px] flex-col w-86 cursor-pointer">

// //                 {/* 2. Dynamic Background Image */}
// //                 {/* We use style={{}} for dynamic images because Tailwind class names can't accept variables easily */}
// //                 <div
// //                     className="h-[150px] w-86 flex bg-cover bg-center rounded-t-2xl border-none text-BrightWritingColor gap-3"
// //                     style={{ backgroundImage: `url(${itemData.image})` }}
// //                 // style={{ backgroundImage: `url(${'muttonCurryPhoto.jpg'})`, backgroundSize: 'fit' }}
// //                 >

// //                     {/* Dynamic Category */}
// //                     <div className="bg-black/40 h-fit m-1 ml-3 p-1 px-2 rounded-md text-[12px] cursor-pointer hover:bg-black/90 backdrop-blur-sm">
// //                         {itemData.category}
// //                     </div>

// //                     {/* Dynamic Spice Level (Only shows if spiceLevel exists) */}
// //                     {itemData.spiceLevel && (
// //                         <div className="bg-black/40 h-fit m-1 p-1 px-2 rounded-md text-[12px] hover:bg-black/90 backdrop-blur-sm flex items-center gap-1 cursor-pointer">
// //                             {itemData.spiceLevel} {spiceIcons[itemData.spiceLevel]}
// //                         </div>
// //                     )}
// //                 </div>

// //                 <div className="text-BrightWritingColor box-content flex p-4 flex-col gap-2">
// //                     {/* 3. Dynamic Name */}
// //                     <div className="text-[20px] font-medium leading-tight">
// //                         {itemData.name}
// //                     </div>

// //                     {/* Dynamic Description */}
// //                     <div className="text-[13px] text-lightWritingColor h-10 overflow-hidden text-ellipsis line-clamp-2">
// //                         {itemData.description}
// //                     </div>

// //                     <div className="flex justify-between items-center mt-2 relative">
// //                         <div>
// //                             <div className="text-[12px] text-white/50 mb-[-3px]">Price</div>
// //                             <div className="text-lg font-semibold">₹{itemData.price}</div>
// //                         </div>
// //                         <div className='absolute bottom-0 right-0'>

// //                         {currentQuatity > 0
// //                             ? <QuantityControl
// //                             item={itemData}
// //                             handleQuantityChange={handleQuantityChange}
// //                             handleRemoveItem={handleRemoveItem}
// //                             quantity={currentQuatity} 
// //                             value ={0} />

// //                             :
// //                             <button className="bg-[rgb(214,58,31)] hover:bg-orange-700/90 p-3 rounded-full px-5 text-[15px] font-medium cursor-pointer transition-colors active:scale-90 duration-500 ease-in-out "
// //                             onClick={() => addToCart(itemData)}> 
// //                                 ADD 
// //                             </button>}
// //                         </div>

// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     )
// // }

// // export default OrderComponets



// import React from 'react';
// import QuantityControl from './QuantityControl';

// // Fixed typo: 'iteamData' to 'itemData'
// function OrderComponets({ itemData, addToCart, currentQuatity, handleQuantityChange, handleRemoveItem }) {

//     const spiceIcons = {
//         "Mild": "🌶️",
//         "Medium": "🌶️🌶️",
//         "Hot": "🌶️🌶️🌶️"
//     };

//     // Safety check
//     if (!itemData) return null;

//     return (
//         <>
//             {/* RESPONSIVE CONTAINER:
//                 1. w-full: Fills the screen width on mobile (no more horizontal scrolling).
//                 2. md:w-86: Locks to your fixed 344px width on desktop.
//                 3. max-w-[400px]: Prevents it from getting TOO huge on large tablets if needed.
//             */}
//             <div className="border bg-BrightWritingColor/10 border-white/10 rounded-[15px] flex flex-col w-full md:w-86 cursor-pointer hover:border-white/20">

//                 {/* RESPONSIVE IMAGE AREA */}
//                 {/* 1. w-full: Image matches the card width.
//                     2. h-[180px]: Made slightly taller on mobile for better visuals (optional, or keep 150px).
//                 */}
//                 <div
//                     className="h-[140px] md:h-[180px] md:h-[150px] w-full flex bg-cover bg-center rounded-t-[15px] border-none text-BrightWritingColor gap-3 relative"
//                     style={{ backgroundImage: `url(${itemData.image})` }}
//                 >
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-[15px]"></div>

//                     <div className="relative z-10 bg-black/40 h-fit m-1 ml-3 p-1 px-2 rounded-md text-[12px] cursor-pointer hover:bg-black/90 backdrop-blur-sm mt-3">
//                         {itemData.category}
//                     </div>

//                     {itemData.spiceLevel && (
//                         <div className="relative z-10 bg-black/40 h-fit m-1 p-1 px-2 rounded-md text-[12px] hover:bg-black/90 backdrop-blur-sm flex items-center gap-1 cursor-pointer mt-3">
//                             {itemData.spiceLevel} {spiceIcons[itemData.spiceLevel]}
//                         </div>
//                     )}
//                 </div>

//                 <div className="text-BrightWritingColor box-border flex p-4 flex-col gap-2 flex-1">


//                     <div className="text-lg md:text-[20px] font-medium leading-tight">
//                         {itemData.name}
//                     </div>

//                     <div className="text-[13px] text-lightWritingColor h-10 overflow-hidden text-ellipsis line-clamp-2">
//                         {itemData.description}
//                     </div>


//                     <div className="flex justify-between items-end mt-2 h-8 md:h-12 relative"> 
//                         <div>
//                             <div className="text-[12px] text-white/50 mb-[-2px]">Price</div>
//                             <div className="text-lg font-semibold">₹{itemData.price}</div>
//                         </div>


//                         <div className="">
//                             {currentQuatity > 0 ? (
//                                 <QuantityControl
//                                     item={itemData}
//                                     handleQuantityChange={handleQuantityChange}
//                                     handleRemoveItem={handleRemoveItem}
//                                     quantity={currentQuatity}
//                                     value={0} 
//                                 />
//                             ) : (
//                                 <button 
//                                     className="bg-[rgb(214,58,31)] hover:bg-orange-700/90 py-2 px-6 md:p-3 md:px-5 rounded-full text-sm md:text-[15px] font-medium cursor-pointer  active:scale-95 shadow-lg shadow-orange-900/20"
//                                     onClick={(e) => {
//                                         e.stopPropagation(); // Prevents clicking the card background
//                                         addToCart(itemData);
//                                     }}
//                                 >
//                                     ADD
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default OrderComponets;


import React from 'react';
import QuantityControl from './QuantityControl';

function OrderComponets({ itemData, addToCart, currentQuatity, handleQuantityChange, handleRemoveItem }) {

    // ⚠️ CRITICAL: Must match your backend IP
    const API_URL = "http://192.168.1.5:5000";

    const spiceIcons = {
        "Mild": "🌶️",
        "Medium": "🌶️🌶️",
        "Hot": "🌶️🌶️🌶️"
    };

    if (!itemData) return null;

    // Helper to get the correct image link
    // If the link is already full (starts with http), keep it. 
    // If it's relative (/images/...), add the API_URL in front.
    const getImageUrl = (img) => {
        if (!img) return "https://via.placeholder.com/300x200?text=No+Image";
        if (img.startsWith("http")) return img;
        return `${API_URL}${img}`;
    };

    return (
        <>
            <div className="border bg-white/5 border-white/10 rounded-[15px] flex flex-col w-full md:w-86 cursor-pointer hover:border-white/20 transition-colors">

                {/* IMAGE AREA */}
                <div
                    className="h-[140px] md:h-[150px] w-full flex bg-cover bg-center rounded-t-[15px] relative"
                    style={{ backgroundImage: `url(${getImageUrl(itemData.image)})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-[15px]"></div>

                    {/* Category Tag */}
                    <div className="relative z-10 bg-black/40 h-fit m-3 p-1 px-2 rounded-md text-[10px] uppercase tracking-wide text-white  cursor-pointer hover:bg-black/90 backdrop-blur-sm mt-3">
                        {itemData.category}
                    </div>

                    {/* Spice Level */}
                    {/* {itemData.spiceLevel && (
                        <div className="absolute top-3 right-3 z-10 bg-black/60 p-1 px-2 rounded-md text-[10px] text-white backdrop-blur-sm border border-white/10">
                            {itemData.spiceLevel} {spiceIcons[itemData.spiceLevel]}
                        </div>
                    )} */}

                    {itemData.spiceLevel && (
                        <div className="relative z-10 bg-black/40 h-fit m-1 p-1 px-2 rounded-md text-white text-[12px] hover:bg-black/90 backdrop-blur-sm flex items-center gap-1 cursor-pointer mt-3">
                            {itemData.spiceLevel} {spiceIcons[itemData.spiceLevel]}
                        </div>
                    )}
                </div>

                {/* CONTENT AREA */}
                <div className="text-white p-4 flex flex-col gap-2 flex-1">

                    <div className="flex justify-between items-start">
                        <div className="text-lg md:text-[18px] font-medium leading-tight line-clamp-1">
                            {itemData.name}
                        </div>
                        {itemData.isVeg ? (
                            <div className="w-4 h-4 border border-green-500 p-[2px] rounded-sm flex items-center justify-center shrink-0">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                        ) : (
                            <div className="w-4 h-4 border border-red-500 p-[2px] rounded-sm flex items-center justify-center shrink-0">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            </div>
                        )}
                    </div>

                    <div className="text-[13px] text-gray-400 h-10 overflow-hidden text-ellipsis line-clamp-2 leading-relaxed">
                        {itemData.description}
                    </div>

                    {/* PRICE & BUTTON */}
                    <div className="flex justify-between items-end mt-3 h-10">
                        <div>
                            <div className="text-[11px] text-gray-500 uppercase tracking-wider">Price</div>
                            <div className="text-lg font-medium text-white/90">₹{itemData.price}</div>
                        </div>

                        <div>
                            {currentQuatity > 0 ? (
                                <QuantityControl
                                    item={itemData}
                                    handleQuantityChange={handleQuantityChange}
                                    handleRemoveItem={handleRemoveItem}
                                    quantity={currentQuatity}
                                    value={0}
                                />
                            ) : (
                                <button
                                    className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-6 rounded-full text-sm font-bold active:scale-95 transition-all shadow-lg shadow-orange-900/40"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(itemData);
                                    }}
                                >
                                    ADD
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderComponets;