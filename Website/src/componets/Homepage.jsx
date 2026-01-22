import NavBarChe from "./NavBarChe.jsx";
import NavBar from "./NavBarChe.jsx";


function Homepage() {
  return (
    <>
        <NavBarChe />

        <div className="h-[1000px]" ></div>
        <div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/60 to-transparent backdrop-blur-sm pointer-events-none z-20"
      ></div>
    </>
  )
}

export default Homepage