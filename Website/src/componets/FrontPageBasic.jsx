import React from 'react'

function FrontPageBasic({ title, value }) {
    return (
        <>
            
                <div className="bg-white/10 p-4 rounded-2xl px-5 min-w-[250px]  flex flex-col gap-1 border border-white/20">
                    <div className="text-[13px] text-white/60">{title}</div>
                    <div className="text-BrightWritingColor font-medium">{value}</div>
                </div>
        </>
    )
}

export default FrontPageBasic