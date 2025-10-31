require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sidlabs-expense-tracker-frontend.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());



// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));
mongoose.connect(process.env.ATLASDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to ATLAS DB'))
.catch(err => console.error('DB connection error:', err));

// console.log("MONGO_URI:", process.env.MONGO_URI);


// Basic route
// app.get('/', (req, res) => {
//     res.send('Expense Tracker Backend is running');
// });

const authRoutes = require("./routes/auth");
const expensesRouter = require('./routes/expenses');


app.use("/api/auth", authRoutes);
app.use('/api/expenses', expensesRouter);



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});