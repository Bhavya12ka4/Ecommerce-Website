import React from 'react'

function SmallBar() {
    return (
        <>
            <div className='bg-black flex justify-around  text-BrightWritingColor '>

                <div className='flex flex-col gap-1'>
                    <h2 className='text-3xl font-medium'>The Menu</h2>
                    <h3 className='text-lightWritingColor'>Chicken. Mutton. Seafood. Built on fire, smoke, and slow simmer.</h3>
                </div>
                <div className='align-middle flex gap-5 mt-5'>
                    <div ><button className='bg-white/8 p-2 px-4 rounded-full hover:bg-white/10 cursor-pointer'>All</button></div> 
                    <div><button className='bg-white/8 p-2 px-4 rounded-full hover:bg-white/10 cursor-pointer'>Chicken</button></div>
                    <div><button className='bg-white/8 p-2 px-4 rounded-full hover:bg-white/10 cursor-pointer'>Mutton</button></div>
                    <div><button className='bg-white/8 p-2 px-4 rounded-full hover:bg-white/10 cursor-pointer'>Sides</button></div>
                </div>
            </div>
        </>
    )
}

export default SmallBar