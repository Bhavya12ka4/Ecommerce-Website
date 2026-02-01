// import React from 'react'

// function SmallBar({ selectedCategory, setSelectedCategory, menuItems }) {
//     const categories = ['All', 'Chicken', 'Mutton','Seafood', 'Sides'];


//     return (
//         <>
//             <div className='bg-black flex justify-around  text-BrightWritingColor '>

//                 <div className='flex flex-col gap-1'>
//                     <h2 className='text-3xl font-medium'>The Menu</h2>
//                     <h3 className='text-lightWritingColor'>Chicken. Mutton. Seafood. Built on fire, smoke, and slow simmer.</h3>
//                 </div>
//                 <div className='align-middle flex gap-3 mt-5'>
//                     {categories.map((category) => (
//                         <button
//                             key={category}
//                             onClick={() => setSelectedCategory(category)}
//                             className={`
//                                  p-2 px-4 rounded-full cursor-pointer
//                                 ${selectedCategory === category
//                                     ? "bg-[rgb(214,58,31)] hover:bg-orange-700/90"
//                                     : "bg-white/8 hover:bg-white/10 focus:bg-white/15 "
//                                 }    
//                             `}
//                         >
//                             {category}
//                         </button>
//                     ))}
                    
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SmallBar


import React from 'react'

function SmallBar({ selectedCategory, setSelectedCategory, menuItems }) {
    const categories = ['All', 'Chicken', 'Mutton', 'Seafood', 'Biryani / Rice Bowls','Chinese', 'Thali','Sides'];

    return (
        <>
            {/* RESPONSIVE CONTAINER:
               1. flex-col: Stack text and buttons vertically on mobile.
               2. md:flex-row: Put them side-by-side on desktop.
               3. p-6: Added padding so it doesn't touch the screen edges on mobile.
               4. gap-6: Adds space between the text and the buttons on mobile.
            */}
            <div className='bg-black flex flex-col gap-2 md:flex-row justify-between md:justify-around items-center text-BrightWritingColor p-6 md:py-8 md:pb-0'>

                {/* --- TEXT SECTION --- */}
                {/* text-center on mobile, text-left on desktop */}
                <div className='flex flex-col gap-2 items-center md:items-start text-center md:text-left max-w-lg'>
                    <h2 className='text-2xl md:text-3xl font-medium'>The Menu</h2>
                    <h3 className='text-sm md:text-base text-lightWritingColor'>
                        Chicken. Mutton. Seafood. Built on fire, smoke, and slow simmer.
                    </h3>
                </div>

                {/* --- BUTTONS SECTION --- */}
                {/* 1. flex-wrap: Crucial! If the phone is small, buttons will wrap to the next line.
                   2. justify-center: Centers the buttons on mobile.
                   3. mt-0: Removed fixed margin since we use gap-6 on the parent now.
                */}
                <div className='flex flex-wrap justify-center gap-2 md:gap-3 w-full md:w-auto'>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                                p-2 px-4 rounded-full cursor-pointer text-sm md:text-base transition-all active:scale-95 text-center max-md:pb-1.5
                                ${selectedCategory === category
                                    ? "bg-[rgb(214,58,31)] hover:bg-orange-700/90 text-white font-medium shadow-lg shadow-orange-900/20 max-md:pb-1.5"
                                    : "bg-white/8 hover:bg-white/10 text-white/70 border border-white/5"
                                }    
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                
            </div>
        </>
    )
}

export default SmallBar