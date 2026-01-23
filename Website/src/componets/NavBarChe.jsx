import React from 'react'

function NavBarChe() {
  return (
    <>
        <nav className="bg-black/60 backdrop-blur-md text-lightWritingColor flex justify-around text-[15px] items-center p-4 fixed w-full top-0 z-30">
            <div className="flex justify-center gap-5 items-center cursor-pointer">
                <img src="#" alt="Logo" />
                <div >
                    <div className="restoName text-BrightWritingColor font-medium">Kook Du Cu Curries</div>
                    <div className="mineDescrip text-[#818189] text-[12px]">Curries • Non-veg • Spicy</div>
                </div>
            </div>  

            <div>
                <ol className='flex justify-center gap-5 '>
                    <li className='cursor-pointer hover:text-white/50'>Home</li>
                    <li className='cursor-pointer hover:text-white/50'>Menu</li>
                    <li className='cursor-pointer hover:text-white/50'>Contant</li>
                </ol>
            </div>

            <div className='flex gap-5'>
                <button className='bg-[#2a2b2d]/80 hover:bg-white/12 p-2 rounded-full px-3 text-BrightWritingColor font-medium border border-white/10 cursor-pointer'>Order Now</button>
                <button className='bg-[#2a2b2d]/80 p-2 rounded-full px-3 cursor-pointer' ><img src="#" alt="#" /></button>
            </div>

        </nav>
    </>
  )
}

export default NavBarChe