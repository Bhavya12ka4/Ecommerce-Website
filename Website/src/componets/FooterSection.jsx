// import React from 'react';

// function FooterSection() {
//   return (
//     <div className="bg-black text-white w-full py-12 px-4 md:px-10 pb-20">
//       <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
//         {/* --- TOP ROW: Story & Spice Lovers (Stacks on Mobile) --- */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             {/* Card 1: Our Story */}
//             <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col gap-3">
//                 <h3 className="text-xl md:text-2xl font-semibold text-white">Our Story</h3>
//                 <p className="text-lightWritingColor text-sm md:text-[15px] leading-relaxed">
//                     "Kook du Ku" is our love letter to rustic cooking—blackened spice, slow simmer, and honest heat. 
//                     Every curry starts with toasted masala, ends with a fiery finish, and arrives ready to be scooped.
//                 </p>
//             </div>

//             {/* Card 2: Built for spice-lovers */}
//             <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col gap-3">
//                 <h3 className="text-xl md:text-2xl font-semibold text-white">Built for spice-lovers</h3>
//                 <p className="text-lightWritingColor text-sm md:text-[15px] leading-relaxed">
//                     Want it hotter? Tell us in notes during checkout. We’ll tune the heat without killing the flavor.
//                 </p>
//             </div>

//         </div>

//         {/* --- MIDDLE ROW: Contact Info (Full Width) --- */}
//         <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col gap-6">
//             <h3 className="text-xl md:text-2xl font-semibold text-white">Contact</h3>
            
//             {/* Contact Details Grid - Stacks on mobile */}
//             <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10 text-lightWritingColor hover:text-white/90 text-sm md:text-[15px]">
//                 <div className="flex flex-col gap-1">
//                     <span className="text-white/50 text-xs uppercase tracking-wider">Phone</span>
//                     <span className='select-text'>+91 9724765085</span>
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <span className="text-white/50 text-xs uppercase tracking-wider">Hours</span>
//                     <span>12:00 PM – 11:00 PM</span>
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <span className="text-white/50 text-xs uppercase tracking-wider">Location</span>
//                     <span>Shop No 23, 24, First Floor, Royal Heights, Vaishnodevi Circle, Ahmedabad</span>
//                 </div>
//             </div>
//         </div>

//         {/* --- BOTTOM ROW: Copyright & Tip --- */}
//         <div className="flex flex-col-reverse md:flex-row justify-between items-center text-lightWritingColor text-xs md:text-sm mt-4 gap-4">
//             <div>
//                 © 2026 Kook du Ku Curries
//             </div>
//             <div className="text-center md:text-right">
//                 Tip: Open cart anytime from the top-right.
//             </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default FooterSection;

import React, { useState } from 'react'; // ✅ Import useState to prevent crash

function FooterSection() {
    
    // 1. State for the "Copied!" popup
    const [copied, setCopied] = useState(false);

    // 2. The Safe Copy Function
    const handleCopy = () => {
        const textToCopy = "+91 9724765085";

        // Method A: Modern (Works on HTTPS / Localhost)
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => triggerSuccess())
                .catch((err) => console.error("Copy failed", err));
        } 
        // Method B: Fallback (Works on Phones / HTTP)
        else {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                
                // Make it invisible so it doesn't break layout
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                triggerSuccess();
            } catch (err) {
                console.error("Fallback copy failed", err);
            }
        }
    };

    const triggerSuccess = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
    };

    return (
        <div id="Contact" className="bg-black text-white w-full py-12 px-4 md:px-10 pb-20">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">

                {/* --- TOP ROW --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col gap-3">
                        <h3 className="text-xl md:text-2xl font-semibold text-white">Our Story</h3>
                        <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed">
                            "Kook du Ku" is our love letter to rustic cooking—blackened spice, slow simmer, and honest heat.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col gap-3">
                        <h3 className="text-xl md:text-2xl font-semibold text-white">Built for spice-lovers</h3>
                        <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed">
                            Want it hotter? Tell us in notes during checkout.
                        </p>
                    </div>
                </div>

                {/* --- MIDDLE ROW: Contact --- */}
                <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col gap-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">Contact</h3>

                    <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10 text-gray-400 text-sm md:text-[15px]">
                        
                        {/* PHONE NUMBER SECTION (Fixed) */}
                        <div 
                            className="flex flex-col gap-1 cursor-pointer relative group w-fit transition-transform active:scale-95 select-none"
                            onClick={handleCopy}
                            // 👆 select-none: Stops the blue highlight/stickiness
                            // 👆 active:scale-95: Adds a button-press animation
                        >
                            <span className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-2">
                                Phone
                                <span className="text-[10px] text-orange-500 opacity-80">(Tap to copy)</span>
                            </span>
                            
                            <span className="font-medium text-white hover:text-white/80 transition-colors">
                                +91 9724765085
                            </span>

                            {/* "Copied!" Popup */}
                            {copied && (
                                <div className="absolute -top-8 left-0 bg-white text-black text-xs font-bold px-2 py-1 rounded shadow-lg animate-bounce z-20">
                                    Copied!
                                </div>
                            )}
                        </div>

                        {/* Hours */}
                        <div className="flex flex-col gap-1">
                            <span className="text-white/50 text-xs uppercase tracking-wider">Hours</span>
                            <span>12:00 PM – 11:00 PM</span>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-1 md:max-w-[350px]">
                            <span className="text-white/50 text-xs uppercase tracking-wider">Location</span>
                            <span>Shop No 23, 24, First Floor, Royal Heights, Vaishnodevi Circle, Ahmedabad</span>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM ROW --- */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center text-gray-500 text-xs md:text-sm mt-4 gap-4">
                    <div>© 2026 Kook du Ku Curries</div>
                    <div>Tip: Open cart anytime from the top-right.</div>
                </div>

            </div>
        </div>
    );
}

export default FooterSection;