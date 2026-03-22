require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const path = require('path');

const app = express();

// Middleware
// app.use(cors());
// app.use(cors({
//     origin: 'https://ecommerce-website-eta.vercel.app', // Allows your Vercel site to access the backend
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type']
// }));

const allowedOrigins = [
    'https://ecommerce-website-eta.vercel.app',
    'https://kook-du-ku-curries.onrender.com',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps) or matched origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/images', express.static('images'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected!'))
    .catch((err) => console.log('❌ DB Error:', err));

// --- 1. MENU SCHEMA (Already Done) ---
const menuSchema = new mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    price: Number,
    description: String,
    image: String,
    spiceLevel: String,
    isVeg: Boolean
});
const Menu = mongoose.model('Menu', menuSchema);

// --- 2. ORDER SCHEMA (New!) ---
// This tells MongoDB how to save an order
const orderSchema = new mongoose.Schema({
    customerName: String,
    phone: String,
    address: String,
    items: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: Number,
    note: String,
    status: { type: String, default: "Pending" }, // Pending -> Cooking -> Delivered
    createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// --- 3. CUSTOMER SCHEMA (New!) ---
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Customer = mongoose.model('Customer', customerSchema);


// --- ROUTES ---

// Get Menu (For your Website)
app.get('/api/menu', async (req, res) => {
    try {
        const items = await Menu.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Place an Order (Website sends data HERE)
app.post('/api/orders', async (req, res) => {
    try {
        console.log("📦 Incoming Data:", req.body);
        const newOrder = new Order(req.body); // Create order from website data
        await newOrder.save(); // Save to MongoDB
        console.log("🔔 New Order Received from:", req.body.customerName);
        res.status(201).json({ message: "Order Placed Successfully!", orderId: newOrder._id });
    } catch (err) {
        console.error("Order Error:", err);
        res.status(500).json({ error: "Failed to place order" });
    }
});

// --- CUSTOMER AUTH ROUTES ---
// 1. Register
app.post('/api/customers/register', async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        
        // Check if phone already exists
        const existingCustomer = await Customer.findOne({ phone });
        if (existingCustomer) {
            return res.status(400).json({ error: "Phone number already registered" });
        }

        const newCustomer = new Customer({ name, phone, password });
        await newCustomer.save();
        
        res.status(201).json({ message: "Registration successful!", user: { name: newCustomer.name, phone: newCustomer.phone } });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ error: "Registration failed" });
    }
});

// 2. Login
app.post('/api/customers/login', async (req, res) => {
    try {
        const { phone, password } = req.body;
        
        const customer = await Customer.findOne({ phone });
        if (!customer) {
            return res.status(404).json({ error: "User not found. Please sign up." });
        }

        if (customer.password !== password) {
            return res.status(401).json({ error: "Invalid password." });
        }

        res.json({ message: "Login successful!", user: { name: customer.name, phone: customer.phone } });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Login failed" });
    }
});

// --- GET ORDERS (Smart Filtering) ---
app.get('/api/orders', async (req, res) => {
    try {
        const type = req.query.type; // Check if frontend wants 'active' or 'history'
        let query = {};

        if (type === 'active') {
            // Get everything EXCEPT 'Completed'
            query = { status: { $ne: 'Completed' } };
        } else if (type === 'history') {
            // Get ONLY 'Completed'
            query = { status: 'Completed' };
        }

        // If asking for history, limit to last 50 (to prevent crashing)
        // If asking for active, show all of them
        const limit = type === 'history' ? 50 : 0;

        const orders = await Order.find(query)
            .sort({ createdAt: -1 }) // Newest first
            .limit(limit);

        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on Port ${PORT}`);
});

// --- NEW ROUTE: Update Order Status ---
app.patch('/api/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true } // Return the updated document
        );
        res.json(updatedOrder);
        console.log(`🔄 Order Status Updated: ${status}`);
    } catch (err) {
        res.status(500).json({ error: "Failed to update status" });
    }
});

// // Serve Frontend Static Files (If you are hosting both on Render)
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// // Fallback for React Router
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });


// 1. Serve static files from the 'Website/dist' folder
// Based on your Image 4 structure, 'Website' is a sibling to your backend files
// app.use(express.static(path.join(__dirname, '../Website/dist')));

// // 2. Handle React Router (This MUST be the last route in your file)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../Website/dist', 'index.html'));
// });

// app.get('(.*)', (req, res) => {
//     res.sendFile(path.join(__dirname, '../Website/dist', 'index.html'));
// });