// import React from 'react'

// function FrontPageBasic({ title, value }) {
//     return (
//         <>
            
//                 <div className="bg-white/10 p-4 rounded-2xl px-5 min-w-[250px]  flex flex-col gap-1 border border-white/20">
//                     <div className="text-[13px] text-white/60">{title}</div>
//                     <div className="text-BrightWritingColor font-medium">{value}</div>
//                 </div>
//         </>
//     )
// }

// export default FrontPageBasic

import React from 'react'

function FrontPageBasic({ title, value }) {
    return (
        <>
            {/* RESPONSIVE CHANGES:
                1. w-full: Fills the width on mobile.
                2. md:w-auto md:min-w-[250px]: Restores the fixed size on Desktop.
                3. p-3 md:p-4: Slightly tighter padding on mobile.
            */}
            <div className="bg-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl px-4 md:px-5 w-auto md:min-w-[250px] flex flex-col gap-1 border border-white/20 backdrop-blur-sm">
                
                {/* Responsive Text: text-xs on mobile, text-[13px] on desktop */}
                <div className="text-[9px] md:text-[13px] text-white/60  tracking-wider">
                    {title}
                </div>
                
                {/* Responsive Value: text-sm on mobile, text-base on desktop */}
                <div className="text-BrightWritingColor text-[11px] md:text-[15px] font-medium">
                    {value}
                </div>
                
            </div>
        </>
    )
}

export default FrontPageBasic