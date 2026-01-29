import React from 'react'

function SmallBar({ selectedCategory, setSelectedCategory, menuItems }) {
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
                    
                </div>
            </div>
        </>
    )
}

export default SmallBar