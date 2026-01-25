import React from 'react'

function SmallBar({ selectedCategory, setSelectedCategory }) {
    const categories = ['All', 'Chicken', 'Mutton','Seafood', 'Sides'];
    return (
        <>
            <div className='bg-black flex justify-around  text-BrightWritingColor '>

                <div className='flex flex-col gap-1'>
                    <h2 className='text-3xl font-medium'>The Menu</h2>
                    <h3 className='text-lightWritingColor'>Chicken. Mutton. Seafood. Built on fire, smoke, and slow simmer.</h3>
                </div>
                <div className='align-middle flex gap-3 mt-5'>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                                 p-2 px-4 rounded-full cursor-pointer
                                ${selectedCategory === category
                                    ? "bg-[rgb(214,58,31)] hover:bg-orange-700/90"
                                    : "bg-white/8 hover:bg-white/10 focus:bg-white/15 "
                                }    
                            `}
                        >
                            {category}
                        </button>
                    ))}
                    {/* <div ><button className='bg-white/8 p-2 px-4 rounded-full hover:bg-white/10 cursor-pointer' active:bg-[rgb(214,58,31)] focus:bg-[rgb(214,58,31)]'>All</button></div> 
                    <div><button className='bg-white/8 p-2 px-4 rounded-full hover:bg-white/10 cursor-pointer active:bg-[rgb(214,58,31)] focus:bg-[rgb(214,58,31)]'>Chicken</button></div>
                    <div><button className='bg-white/8 p-2 px-4 rounded-full hover:bg-white/10 cursor-pointer active:bg-[rgb(214,58,31)] focus:bg-[rgb(214,58,31)]'>Mutton</button></div>
                    <div><button className='bg-white/8 p-2 px-4 rounded-full hover:bg-white/10 cursor-pointer active:bg-[rgb(214,58,31)] focus:bg-[rgb(214,58,31)]'>Sides</button></div> */}
                </div>
            </div>
        </>
    )
}

export default SmallBar