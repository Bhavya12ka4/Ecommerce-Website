// import React from 'react'
// import FrontPageBasic from './FrontPageBasic';


// function HeroPosterPage({scrollToSection}) {
    
//     // Scroll to section function
//     // const scrollToSection = (sectionId) => {
//     //     const element = document.getElementById(sectionId);
//     //     if (element) {
//     //         element.scrollIntoView({ behavior: 'smooth' });
//     //     }
//     // };

//     const infoItems = [
//         {
//             title: "Spice levels",
//             value: "Mild • Medium • Hot",
//         },
//         {
//             title: "Preparation",
//             value: "Slow Cooked • Charcoal",
//         },
//         {
//             title: "Origin",
//             value: "Traditional Recipes",
//         },
//     ];
//     return (
//         <>
//             <div id='Home' className="h-screen relative -scroll-mt-8 bg-black" >
//                 <div className="absolute inset-0 h-screen w-full bg-[url('/muttonCurryPhoto4.jpg')] bg-cover bg-center opacity-40 flex"></div>

//                 <div className="relative h-screen w-full z-20 p-35 pl-50 flex flex-col  gap-5">
//                     <div className="text-BrightWritingColor bg-white/8 mr-auto text-[12px] font-medium font- py-1 rounded-full border border-white/20 px-2">Rustic • Bold • Fiery <span className="text-orange-500">•</span> Non-veg curries</div>

//                     <h1 className="text-BrightWritingColor text-6xl font-medium">Kook du Ku Curries <br /> where spice stays honest.</h1>

//                     <div className="text-white/80 text-[19px]">Chicken, mutton, and seafood—slow-simmered, charcoal-kissed, and served with <br />a heat you can feel.</div>

//                     <div className="flex gap-3 text-BrightWritingColor">
//                         <button className="bg-[rgb(214,58,31)] hover:bg-orange-700/90 p-3 rounded-full px-5 text-[15px] font-medium cursor-pointer" onClick={() => scrollToSection('Home')} >Order Now</button>
//                         <button className="bg-white/12 hover:bg-white/15 p-3 rounded-full px-5 text-[15px] font-medium border border-white/10 cursor-pointer menu" onClick={() => scrollToSection('Menu')} >Explore Menu</button>
//                     </div>

//                     <div className="text-white flex gap-5">
//                         {infoItems.map((item, index) => (
//                             <FrontPageBasic key={index} title={item.title} value={item.value} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default HeroPosterPage




import React from 'react'
import FrontPageBasic from './FrontPageBasic';

function HeroPosterPage({ scrollToSection }) {

    const infoItems = [
        { title: "Spice levels", value: "Mild • Medium • Hot" },
        { title: "Preparation", value: "Slow Cooked • Charcoal" },
        { title: "Origin", value: "Traditional Recipes" },
    ];

    return (
        <>
            <div id='Home' className="h-screen relative -scroll-mt-8 bg-black">
                {/* Background Image: Kept opacity and cover settings */}
                <div className="absolute inset-0 h-screen w-full bg-[url('/muttonCurryPhoto4.jpg')] bg-cover bg-center opacity-40 flex"></div>

                <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10"></div>

                <div className="relative h-screen w-full z-20 p-6 flex flex-col justify-center md:justify-start md:p-35 md:pl-50 gap-5">
                    
                    {/* Tagline Badge */}
                    <div className="text-BrightWritingColor bg-white/8 mr-auto text-[12px] font-medium py-1 rounded-full border border-white/20 px-2 backdrop-blur-sm">
                        Rustic • Bold • Fiery <span className="text-orange-500">•</span> Non-veg curries
                    </div>

                    {/* text-4xl on mobile, text-6xl on desktop */}
                    <h1 className="text-BrightWritingColor text-3xl md:text-6xl font-medium leading-tight shadow-black drop-shadow-lg">
                        Kook du Ku Curries <br  /> where spice stays honest.
                    </h1>

                    {/* text-sm on mobile, text-[19px] on desktop. Removed <br> on mobile so text wraps naturally. */}
                    <div className="text-white/80 text-sm md:text-[19px] max-w-2xl">
                        Chicken, mutton, and seafood—slow-simmered, charcoal-kissed, and served with 
                        <span className="md:block"> a heat you can feel.</span>
                    </div>


                    {/* flex-col (stacked) on mobile, flex-row (side-by-side) on desktop */}
                    <div className="flex flex-col md:flex-row gap-3 text-BrightWritingColor w-full md:w-auto mt-2">
                        <button 
                            className="bg-[rgb(214,58,31)] hover:bg-orange-700/90 p-3 rounded-full px-8 text-[15px] font-medium cursor-pointer transition-transform active:scale-95 text-center" 
                            onClick={() => scrollToSection('Menu')} // Fixed: Changed 'Home' to 'Menu' so "Order Now" takes you to food
                        >
                            Order Now
                        </button>
                        
                        <button 
                            className="bg-white/12 hover:bg-white/15 p-3 rounded-full px-8 text-[15px] font-medium border border-white/10 cursor-pointer menu transition-transform active:scale-95 text-center" 
                            onClick={() => scrollToSection('Menu')} 
                        >
                            Explore Menu
                        </button>
                    </div>

                    <div className="text-white flex md:flex-row gap-3 md:gap-5 mt-4 md:mt-0 flex-wrap ">
                        {infoItems.map((item, index) => (
                            <FrontPageBasic key={index} title={item.title} value={item.value} />
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default HeroPosterPage