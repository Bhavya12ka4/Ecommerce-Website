import React from 'react'

function OrderComponets() {
    return (
        <>
            <div className=" border bg-BrightWritingColor/10 border-white/10 rounded-[15px] flex-col w-80">
                <div className=" bg-[url('/muttonCurryPhoto2.jpg')] h-[130px] w-80 flex bg-cover bg-center text-BrightWritingColor gap-3">
                    <div className="bg-black/60 h-fit m-1 p-1 px-2 rounded-md text-[12px] hover:bg-black/80">Chicken</div>
                    <div className="bg-black/60 h-fit m-1 p-1 px-2 rounded-md text-[12px] hover:bg-black/80 ">Hot icon icon</div>
                </div>
                <div className="text-BrightWritingColor box-content flex p-4 flex-col gap-2">
                    <div className="text-[20px] font-medium" >Kook du Ku Chicken Curry</div>
                    <div className="text-[13px] text-lightWritingColor">Rustic chicken curry simmered with roasted chili, onion, and cracked pepper.</div>
                    <div className="flex justify-between items-center">
                        <div className="">
                            <div className="text-[12px] text-white/50 mb-[-3px]">Price</div>
                            <div>₹299</div>
                        </div>
                        <button className="bg-[rgb(214,58,31)] hover:bg-orange-700/90 p-3 rounded-full px-5 text-[15px] font-medium cursor-pointer">ADD</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderComponets