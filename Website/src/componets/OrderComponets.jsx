import React from 'react'

// 1. Fixed typo: changed 'iteamData' to 'itemData'
function OrderComponets({ itemData,addToCart }) {

    const spiceIcons = {
        "Mild": "🌶️",
        "Medium": "🌶️🌶️",
        "Hot": "🌶️🌶️🌶️"
    };


    // Safety check: If data hasn't loaded yet, don't break the app
    if (!itemData) return null;

    return (
        <>
            <div className="border bg-BrightWritingColor/10 border-white/10 rounded-[15px] flex-col w-86 cursor-pointer">

                {/* 2. Dynamic Background Image */}
                {/* We use style={{}} for dynamic images because Tailwind class names can't accept variables easily */}
                <div
                    className="h-[150px] w-86 flex bg-cover bg-center rounded-t-2xl border-none text-BrightWritingColor gap-3"
                    style={{ backgroundImage: `url(${itemData.image})` }}
                // style={{ backgroundImage: `url(${'muttonCurryPhoto.jpg'})`, backgroundSize: 'fit' }}
                >

                    {/* Dynamic Category */}
                    <div className="bg-black/40 h-fit m-1 ml-3 p-1 px-2 rounded-md text-[12px] cursor-pointer hover:bg-black/90 backdrop-blur-sm">
                        {itemData.category}
                    </div>

                    {/* Dynamic Spice Level (Only shows if spiceLevel exists) */}
                    {itemData.spiceLevel && (
                        <div className="bg-black/40 h-fit m-1 p-1 px-2 rounded-md text-[12px] hover:bg-black/90 backdrop-blur-sm flex items-center gap-1 cursor-pointer">
                            {itemData.spiceLevel} {spiceIcons[itemData.spiceLevel]}
                        </div>
                    )}
                </div>

                <div className="text-BrightWritingColor box-content flex p-4 flex-col gap-2">
                    {/* 3. Dynamic Name */}
                    <div className="text-[20px] font-medium leading-tight">
                        {itemData.name}
                    </div>

                    {/* Dynamic Description */}
                    <div className="text-[13px] text-lightWritingColor h-10 overflow-hidden text-ellipsis line-clamp-2">
                        {itemData.description}
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <div>
                            <div className="text-[12px] text-white/50 mb-[-3px]">Price</div>
                            {/* Dynamic Price */}
                            <div className="text-lg font-semibold">₹{itemData.price}</div>
                        </div>
                        <button className="bg-[rgb(214,58,31)] hover:bg-orange-700/90 p-3 rounded-full px-5 text-[15px] font-medium cursor-pointer transition-colors active:scale-90 duration-500 ease-in-out " 
                        onClick={()=> addToCart(itemData)}>
                            ADD
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderComponets