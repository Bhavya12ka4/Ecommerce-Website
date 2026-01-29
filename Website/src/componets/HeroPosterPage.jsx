import React from 'react'
import FrontPageBasic from './FrontPageBasic';


function HeroPosterPage({scrollToSection}) {
    
    // Scroll to section function
    // const scrollToSection = (sectionId) => {
    //     const element = document.getElementById(sectionId);
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };

    const infoItems = [
        {
            title: "Spice levels",
            value: "Mild • Medium • Hot",
        },
        {
            title: "Preparation",
            value: "Slow Cooked • Charcoal",
        },
        {
            title: "Origin",
            value: "Traditional Recipes",
        },
    ];
    return (
        <>
            <div id='Home' className="h-screen relative -scroll-mt-8 bg-black" >
                <div className="absolute inset-0 h-screen w-full bg-[url('/muttonCurryPhoto4.jpg')] bg-cover bg-center opacity-40 flex"></div>

                <div className="relative h-screen w-full z-20 p-35 pl-50 flex flex-col  gap-5">
                    <div className="text-BrightWritingColor bg-white/8 mr-auto text-[12px] font-medium font- py-1 rounded-full border border-white/20 px-2">Rustic • Bold • Fiery <span className="text-orange-500">•</span> Non-veg curries</div>

                    <h1 className="text-BrightWritingColor text-6xl font-medium">Kook du Ku Curries <br /> where spice stays honest.</h1>

                    <div className="text-white/80 text-[19px]">Chicken, mutton, and seafood—slow-simmered, charcoal-kissed, and served with <br />a heat you can feel.</div>

                    <div className="flex gap-3 text-BrightWritingColor">
                        <button className="bg-[rgb(214,58,31)] hover:bg-orange-700/90 p-3 rounded-full px-5 text-[15px] font-medium cursor-pointer" onClick={() => scrollToSection('Home')} >Order Now</button>
                        <button className="bg-white/12 hover:bg-white/15 p-3 rounded-full px-5 text-[15px] font-medium border border-white/10 cursor-pointer menu" onClick={() => scrollToSection('Menu')} >Explore Menu</button>
                    </div>

                    <div className="text-white flex gap-5">
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