const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Allow your React app to talk to this server
app.use(cors());
app.use('/images', express.static('images'));

const menuData = [
  // --- STARTERS (Smokey Dry Manches) ---
  {
    id: 1,
    name: "Chicken Tangdi Kabab (2 pcs)",
    description: "Succulent chicken drumsticks marinated in aromatic spices and roasted in the tandoor.",
    price: 220,
    category: "Starters",
    spiceLevel: "Medium",
    // image: "./images/chicken-tanged-kabab.webp",
    image: "http://localhost:5000/images/chicken-tanged-kabab.webp",
    isVeg: false
  },
  {
    id: 2,
    name: "Peri Peri Chicken Tikka (8 pcs)",
    description: "Juicy chicken chunks marinated in fiery peri-peri spices and charcoal grilled.",
    price: 250,
    category: "Starters",
    spiceLevel: "Hot",
    image: "/images/peri-peri-tikka.jpg",
    isVeg: false
  },
  {
    id: 3,
    name: "Pahadi Chicken Tikka (8 pcs)",
    description: "Chicken marinated in a fresh green herb paste of mint, coriander, and chilies.",
    price: 250,
    category: "Starters",
    spiceLevel: "Medium",
    image: "/images/pahadi-tikka.jpg",
    isVeg: false
  },
  {
    id: 4,
    name: "Lemon Chicken Tikka (8 pcs)",
    description: "Zesty and tangy chicken tikka with a refreshing burst of lemon and mild spices.",
    price: 250,
    category: "Starters",
    spiceLevel: "Mild",
    image: "/images/lemon-tikka.jpg",
    isVeg: false
  },
  {
    id: 5,
    name: "Multani Chicken Tikka (8 pcs)",
    description: "Aromatic chicken kababs spiced with traditional Multani herbs and roasted to perfection.",
    price: 250,
    category: "Starters",
    spiceLevel: "Medium",
    image: "/images/multani-tikka.jpg",
    isVeg: false
  },
  {
    id: 6,
    name: "Afghani Tangdi Kabab (2 pcs)",
    description: "Rich and creamy chicken drumsticks marinated in cashew paste and mild spices.",
    price: 250,
    category: "Starters",
    spiceLevel: "Mild",
    image: "/images/afghani-tangdi.jpg",
    isVeg: false
  },
  {
    id: 7,
    name: "Malai Chicken Tikka (8 pcs)",
    description: "Melt-in-your-mouth chicken marinated in cream, cheese, and cardamom.",
    price: 300,
    category: "Starters",
    spiceLevel: "Mild",
    image: "/images/malai-tikka.jpg",
    isVeg: false
  },
  {
    id: 8,
    name: "Afghani Chicken Tikka (8 pcs)",
    description: "Tender chicken chunks in a rich, white creamy marinade, grilled in the tandoor.",
    price: 300,
    category: "Starters",
    spiceLevel: "Mild",
    image: "/images/afghani-tikka.jpg",
    isVeg: false
  },
  {
    id: 9,
    name: "Fish Fry (4 pcs)",
    description: "Crispy fried fish fillets coated in a spicy, homestyle masala blend.",
    price: 220,
    category: "Seafood Starter",
    spiceLevel: "Medium",
    image: "/images/fish-fry.jpg",
    isVeg: false
  },
  {
    id: 10,
    name: "Jinga Fry (8-9 pcs)",
    description: "Fresh prawns marinated in spices and shallow fried until golden and crispy.",
    price: 300,
    category: "Seafood Starter",
    spiceLevel: "Medium",
    image: "/images/jinga-fry.jpg",
    isVeg: false
  },

  // --- CHICKEN SPECIAL CURRIES ---
  {
    id: 11,
    name: "Chicken Curry",
    description: "Homestyle rustic chicken curry cooked with traditional spices.",
    price: 200,
    category: "Chicken Mains",
    spiceLevel: "Medium",
    image: "/images/chicken-curry.jpg",
    isVeg: false
  },
  {
    id: 12,
    name: "Chicken Leg Curry",
    description: "A special curry featuring tender whole chicken legs simmered in gravy.",
    price: 250,
    category: "Chicken Mains",
    spiceLevel: "Medium",
    image: "/images/chicken-leg-curry.jpg",
    isVeg: false
  },
  {
    id: 13,
    name: "Chicken Champaran",
    description: "The signature Ahuna meat—slow-cooked in a sealed clay pot with whole garlic bulbs.",
    price: 300,
    category: "Chicken Mains",
    spiceLevel: "Hot",
    image: "/images/chicken-champaran.jpg",
    isVeg: false
  },
  {
    id: 14,
    name: "Kolhapuri Chicken Curry",
    description: "A bold and fiery curry from Maharashtra made with roasted chili and coconut.",
    price: 300,
    category: "Chicken Mains",
    spiceLevel: "Hot",
    image: "/images/kolhapuri-chicken.jpg",
    isVeg: false
  },
  {
    id: 15,
    name: "Rajasthani Chicken Curry",
    description: "Spicy and robust chicken curry cooked in the traditional Rajasthani style.",
    price: 300,
    category: "Chicken Mains",
    spiceLevel: "Hot",
    image: "/images/rajasthani-chicken.jpg",
    isVeg: false
  },

  // --- MUTTON SPECIAL CURRIES ---
  {
    id: 16,
    name: "Mutton Curry",
    description: "Classic slow-cooked mutton curry with deep flavors and tender meat.",
    price: 250,
    category: "Mutton Mains",
    spiceLevel: "Medium",
    image: "/images/mutton-curry.jpg",
    isVeg: false
  },
  {
    id: 17,
    name: "Mutton Chaap Curry",
    description: "Rich gravy made with mutton ribs (chaap), slow-cooked to perfection.",
    price: 300,
    category: "Mutton Mains",
    spiceLevel: "Medium",
    image: "/images/mutton-chaap.jpg",
    isVeg: false
  },
  {
    id: 18,
    name: "Mutton Champaran",
    description: "Tender mutton slow-cooked in mustard oil and whole spices in a clay handi.",
    price: 350,
    category: "Mutton Mains",
    spiceLevel: "Medium",
    image: "/images/mutton-champaran.jpg",
    isVeg: false
  },
  {
    id: 19,
    name: "Kolhapuri Mutton Curry",
    description: "Spicy mutton curry with the distinctive heat of Kolhapuri chilies.",
    price: 350,
    category: "Mutton Mains",
    spiceLevel: "Hot",
    image: "/images/kolhapuri-mutton.jpg",
    isVeg: false
  },
  {
    id: 20,
    name: "Mutton Laal Maas",
    description: "A legendary Rajasthani curry with a fiery red color and intense chili heat.",
    price: 350,
    category: "Mutton Mains",
    spiceLevel: "Hot",
    image: "/images/lal-maas.jpg",
    isVeg: false
  },

  // --- OUR SPECIALTY (Boneless & Rich Gravies) ---
  {
    id: 21,
    name: "Butter Chicken Curry (Boneless)",
    description: "Classic tandoori chicken simmered in a rich, creamy tomato and butter gravy.",
    price: 250,
    category: "Signature Mains",
    spiceLevel: "Mild",
    image: "/images/butter-chicken.jpg",
    isVeg: false
  },
  {
    id: 22,
    name: "Chicken Lababdar (Boneless)",
    description: "A rich, Mughlai-style gravy with capsicum and onion, slightly tangy and creamy.",
    price: 250,
    category: "Signature Mains",
    spiceLevel: "Mild",
    image: "/images/chicken-lababdar.jpg",
    isVeg: false
  },
  {
    id: 23,
    name: "Chicken Kadhai",
    description: "Chicken tossed with bell peppers and onions in a spicy tomato-based masala.",
    price: 250,
    category: "Signature Mains",
    spiceLevel: "Medium",
    image: "/images/chicken-kadhai.jpg",
    isVeg: false
  },
  {
    id: 24,
    name: "Chicken Angara (Boneless)",
    description: "Smokey and spicy chicken curry with a distinct charcoal flavor.",
    price: 250,
    category: "Signature Mains",
    spiceLevel: "Hot",
    image: "/images/chicken-angara.jpg",
    isVeg: false
  },
  {
    id: 25,
    name: "Chicken Tikka Masala (Boneless)",
    description: "Roasted chicken tikka chunks cooked in a spiced, orange-red curry sauce.",
    price: 280,
    category: "Signature Mains",
    spiceLevel: "Medium",
    image: "/images/tikka-masala.jpg",
    isVeg: false
  },
  {
    id: 26,
    name: "Chicken Mughlai (Boneless)",
    description: "A royal, thick, and creamy egg-based gravy with mild spices.",
    price: 280,
    category: "Signature Mains",
    spiceLevel: "Mild",
    image: "/images/chicken-mughlai.jpg",
    isVeg: false
  },

  // --- EGG & SEAFOOD CURRIES ---
  {
    id: 27,
    name: "Egg Curry",
    description: "Boiled eggs simmered in a homestyle onion-tomato masala.",
    price: 150,
    category: "Eggs",
    spiceLevel: "Medium",
    image: "/images/egg-curry.jpg",
    isVeg: false
  },
  {
    id: 28,
    name: "Egg Kolhapuri (2 Eggs)",
    description: "Eggs cooked in a spicy, coconut-based Kolhapuri gravy.",
    price: 200,
    category: "Eggs",
    spiceLevel: "Hot",
    image: "/images/egg-kolhapuri.jpg",
    isVeg: false
  },
  {
    id: 29,
    name: "Egg Rajasthani (2 Eggs)",
    description: "A vibrant and spicy egg curry cooked with Rajasthani spices.",
    price: 200,
    category: "Eggs",
    spiceLevel: "Hot",
    image: "/images/egg-rajasthani.jpg",
    isVeg: false
  },
  {
    id: 30,
    name: "Fish Curry",
    description: "Tender fish pieces cooked in a tangy and spicy masala gravy.",
    price: 300,
    category: "Egg/Seafood",
    spiceLevel: "Medium",
    image: "/images/fish-curry.jpg",
    isVeg: false
  },
  {
    id: 31,
    name: "Jinga Curry",
    description: "Succulent prawns cooked in a traditional curry sauce.",
    price: 350,
    category: "Egg/Seafood",
    spiceLevel: "Medium",
    image: "/images/jinga-curry.jpg",
    isVeg: false
  },
  {
    id: 32,
    name: "Jinga Masala",
    description: "Prawns tossed in a thick, spicy, semi-dry masala.",
    price: 350,
    category: "Egg/Seafood",
    spiceLevel: "Hot",
    image: "/images/jinga-masala.jpg",
    isVeg: false
  },

  // --- BIRYANI & RICE ---
  {
    id: 33,
    name: "Chicken Dum Biryani",
    description: "Aromatic basmati rice and chicken layered and slow-cooked on dum.",
    price: 220,
    category: "Biryani",
    spiceLevel: "Medium",
    image: "/images/chicken-dum.jpg",
    isVeg: false
  },
  {
    id: 34,
    name: "Mutton Dum Biryani",
    description: "Flavorful biryani with tender mutton pieces and whole spices.",
    price: 300,
    category: "Biryani",
    spiceLevel: "Medium",
    image: "/images/mutton-dum.jpg",
    isVeg: false
  },
  {
    id: 35,
    name: "Egg Dum Biryani (4 Eggs)",
    description: "Spiced rice layered with boiled and fried eggs.",
    price: 300,
    category: "Biryani",
    spiceLevel: "Medium",
    image: "/images/egg-biryani.jpg",
    isVeg: false
  },
  {
    id: 36,
    name: "Chicken Fried Rice",
    description: "Wok-tossed rice with chicken chunks, eggs, and veggies.",
    price: 230,
    category: "Chinese Rice",
    spiceLevel: "Mild",
    image: "/images/chicken-fried-rice.jpg",
    isVeg: false
  },
  {
    id: 37,
    name: "Chicken Schezwan Fried Rice",
    description: "Spicy fried rice tossed in house-made Schezwan sauce.",
    price: 250,
    category: "Chinese Rice",
    spiceLevel: "Hot",
    image: "/images/schezwan-rice.jpg",
    isVeg: false
  },
  {
    id: 38,
    name: "Chicken Garlic Butter Rice",
    description: "Fragrant rice tossed with plenty of garlic and butter.",
    price: 250,
    category: "Chinese Rice",
    spiceLevel: "Mild",
    image: "/images/garlic-rice.jpg",
    isVeg: false
  },
  {
    id: 39,
    name: "Jinga Pulav",
    description: "Aromatic pilaf rice cooked with fresh prawns.",
    price: 380,
    category: "Biryani/Rice",
    spiceLevel: "Medium",
    image: "/images/jinga-pulav.jpg",
    isVeg: false
  },
  {
    id: 40,
    name: "Jeera Rice",
    description: "Basmati rice tempered with cumin seeds.",
    price: 50,
    category: "Biryani/Rice",
    spiceLevel: "Mild",
    image: "/images/jeera-rice.jpg",
    isVeg: true
  },

  // --- CHINESE STARTERS ---
  {
    id: 41,
    name: "Chicken Leg Fry (2 pcs)",
    description: "Crispy fried chicken legs with a Chinese style coating.",
    price: 250,
    category: "Chinese",
    spiceLevel: "Medium",
    image: "/images/leg-fry.jpg",
    isVeg: false
  },
  {
    id: 42,
    name: "Chicken Manchurian Dry (8 pcs)",
    description: "Crispy chicken balls tossed in tangy soy-garlic sauce.",
    price: 330,
    category: "Chinese",
    spiceLevel: "Medium",
    image: "/images/manchurian-dry.jpg",
    isVeg: false
  },
  {
    id: 43,
    name: "Chicken Chilli Dry (8 pcs)",
    description: "Spicy chicken tossed with green chilies, onions, and capsicum.",
    price: 330,
    category: "Chinese",
    spiceLevel: "Hot",
    image: "/images/chilli-chicken.jpg",
    isVeg: false
  },
  {
    id: 44,
    name: "Chicken 65 (8 pcs)",
    description: "Deep-fried chicken tossed in a spicy, red curry leaf masala.",
    price: 330,
    category: "Chinese",
    spiceLevel: "Hot",
    image: "/images/chicken-65.jpg",
    isVeg: false
  },
  {
    id: 45,
    name: "Chicken Lollipop (6 pcs)",
    description: "Frenched chicken winglets battered and deep-fried to perfection.",
    price: 280,
    category: "Chinese",
    spiceLevel: "Medium",
    image: "/images/lollipop.jpg",
    isVeg: false
  },

  // --- RICE BOWLS ---
  {
    id: 46,
    name: "Chicken Curry Rice Bowl (2 pcs)",
    description: "Comfort in a bowl: Chicken curry served over steamed rice.",
    price: 150,
    category: "Rice Bowls",
    spiceLevel: "Medium",
    image: "/images/bowl-curry.jpg",
    isVeg: false
  },
  {
    id: 47,
    name: "Butter Chicken Rice Bowl (2 pcs)",
    description: "Creamy butter chicken served over a bed of fragrant rice.",
    price: 200,
    category: "Rice Bowls",
    spiceLevel: "Mild",
    image: "/images/bowl-butter.jpg",
    isVeg: false
  },
  {
    id: 48,
    name: "Chicken Angara Rice Bowl (2 pcs)",
    description: "Smokey spicy chicken angara served with rice.",
    price: 200,
    category: "Rice Bowls",
    spiceLevel: "Hot",
    image: "/images/bowl-angara.jpg",
    isVeg: false
  },
  {
    id: 49,
    name: "Mutton Curry Rice Bowl (2 pcs)",
    description: "Tender mutton curry served with steamed rice.",
    price: 200,
    category: "Rice Bowls",
    spiceLevel: "Medium",
    image: "/images/bowl-mutton.jpg",
    isVeg: false
  },

  // --- THALI ---
  {
    id: 50,
    name: "Chicken Thali",
    description: "2 pcs Chicken Curry, 3 Roti, Rice - A complete meal.",
    price: 220,
    category: "Thali",
    spiceLevel: "Medium",
    image: "/images/chicken-thali.jpg",
    isVeg: false
  },
  {
    id: 51,
    name: "Mutton Thali",
    description: "2 pcs Mutton Curry, 3 Roti, Rice - A heavy hearty meal.",
    price: 280,
    category: "Thali",
    spiceLevel: "Medium",
    image: "/images/mutton-thali.jpg",
    isVeg: false
  },
  {
    id: 52,
    name: "Butter Chicken Thali",
    description: "2 pcs Boneless Butter Chicken, 3 Roti, Rice.",
    price: 280,
    category: "Thali",
    spiceLevel: "Mild",
    image: "/images/butter-thali.jpg",
    isVeg: false
  },

  // --- EXTRAS ---
  {
    id: 53,
    name: "Roti",
    description: "Freshly baked tandoori roti.",
    price: 10,
    category: "Extras",
    spiceLevel: null,
    image: "/images/roti.jpg",
    isVeg: true
  },
  {
    id: 54,
    name: "Butter Roti",
    description: "Tandoori roti topped with butter.",
    price: 15,
    category: "Extras",
    spiceLevel: null,
    image: "/images/butter-roti.jpg",
    isVeg: true
  },
  {
    id: 55,
    name: "Rotlo",
    description: "Traditional thick millet flatbread.",
    price: 30,
    category: "Extras",
    spiceLevel: null,
    image: "/images/rotlo.jpg",
    isVeg: true
  },
  {
    id: 56,
    name: "Chaasa (Buttermilk)",
    description: "Cool and refreshing spiced buttermilk.",
    price: 20,
    category: "Extras",
    spiceLevel: null,
    image: "/images/chaas.jpg",
    isVeg: true
  },
  {
    id: 57,
    name: "Fried Papad",
    description: "Crispy fried papadum.",
    price: 20,
    category: "Extras",
    spiceLevel: null,
    image: "/images/papad.jpg",
    isVeg: true
  }
];



// --- DON'T FORGET THIS ENDPOINT ---
app.get('/api/menu', (req, res) => {
    res.json(menuData);
});


app.get('/api/menu', (req, res) => {
  res.json(menuData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});