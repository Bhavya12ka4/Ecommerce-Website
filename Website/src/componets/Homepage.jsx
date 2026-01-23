import NavBarChe from "./NavBarChe.jsx";
import HeroPosterPage from "./HeroPosterPage.jsx";
import SmallBar from "./SmallBar.jsx";
import OrderComponets from "./OrderComponets.jsx";


function Homepage() {



    return (
        <>
            <div className="h-1000 bg-black">

                <NavBarChe />
                <HeroPosterPage />
                <div
                    className="absolute bottom-0 left-0 w-full h-55 bg-linear-to-t from-black via-black/60 to-black/0  pointer-events-none z-20"
                ></div>
                <SmallBar />

                <div className="flex flex-wrap gap-1 m-15 ml-30 mr-30 justify-center gap-10 "> 

                    <OrderComponets />
                    <OrderComponets />
                    <OrderComponets />
                    <OrderComponets />
                </div>

            </div>
        </>
    )
}

export default Homepage