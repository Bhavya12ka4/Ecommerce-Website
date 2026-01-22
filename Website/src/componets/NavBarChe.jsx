import React from 'react'

function NavBarChe() {
  return (
    <>
        <nav className="bg-black/80 backdrop-blur-md text-lightWritingColor flex justify-around text-[15px] items-center p-4 fixed w-full top-0 z-10">
            <div className="flex justify-center gap-5 items-center">
                <img src="#" alt="Logo" />
                <div>
                    <div className="restoName text-BrightWritingColor font-medium">Kook Du Cu Curries</div>
                    <div className="mineDescrip text-[#818189] text-[12px]">Curries • Non-veg • Spicy</div>
                </div>
            </div>  

            <div>
                <ol className='flex justify-center gap-5'>
                    <li>Home</li>
                    <li>Menu</li>
                    <li>Contant</li>
                </ol>
            </div>

            <div className='flex gap-5'>
                <button className='bg-[#2a2b2d]/80 p-2 rounded-full px-3 text-BrightWritingColor font-medium'>Order Now</button>
                <button className='bg-[#2a2b2d]/80 p-2 rounded-full px-3' ><img src="#" alt="#" /></button>
            </div>

        </nav>
    </>
  )
}

export default NavBarChe