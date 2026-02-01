// import React, { useState, useEffect } from 'react';
// import './App.css';

// // 1. Check these imports carefully! 
// // Ensure they point to the correct files.
// import Homepages from './componets/Homepage.jsx';
// import AdminOrders from './componets/AdminOrders'; 
// import AdminLogin from './componets/AdminLogin'; 

// function App() {
//   const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
//   // Login State (Checks if you logged in before)
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
//       localStorage.getItem("adminAuth") === "true"
//   );

//   useEffect(() => {
//     const onLocationChange = () => setCurrentPath(window.location.pathname);
//     window.addEventListener('popstate', onLocationChange);
//     return () => window.removeEventListener('popstate', onLocationChange);
//   }, []);

//   const handleLogin = () => {
//       setIsAdminLoggedIn(true);
//       localStorage.setItem("adminAuth", "true");
//   };

//   // -------------------------------------------------
//   // 🔒 GATEKEEPER LOGIC
//   // -------------------------------------------------
  
//   // CASE 1: The user is trying to visit "/admin"
//   if (currentPath.toLowerCase().startsWith('/admin')) {
//       if (isAdminLoggedIn) {
//           // If they have the password -> Show Dashboard
//           return <AdminOrders />;
//       } else {
//           // If they DON'T have password -> Show Lock Screen
//           return <AdminLogin onLogin={handleLogin} />;
//       }
//   }

//   // CASE 2: The user is visiting ANY OTHER page (like "/")
//   // Show the Normal Website
//   return (
//     <>
//       <Homepages />
//     </>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import './App.css';

import Homepages from './componets/Homepage.jsx';
import AdminOrders from './componets/AdminOrders'; 
import AdminLogin from './componets/AdminLogin'; 

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // ADMIN Login State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
      localStorage.getItem("adminAuth") === "true"
  );

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const handleAdminLogin = () => {
      setIsAdminLoggedIn(true);
      localStorage.setItem("adminAuth", "true");
  };

  // -------------------------------------------------
  // 🔒 ROUTING LOGIC
  // -------------------------------------------------
  
  // CASE 1: ADMIN SECTION (Keep this protected!)
  if (currentPath.toLowerCase().startsWith('/admin')) {
      return isAdminLoggedIn ? <AdminOrders /> : <AdminLogin onLogin={handleAdminLogin} />;
  }

  // CASE 2: HOMEPAGE (Open to everyone)
  // We removed the CustomerLogin check here. 
  // Now, login happens inside the Cart.
  return (
    <>
      <Homepages />
    </>
  );
}

export default App;