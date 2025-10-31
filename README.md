# 💰 Expense Tracker — Backend (Node.js + Express + MongoDB)

This is the **backend server** for the MERN Expense Tracker application.  
It handles user authentication, expense management, and communicates securely with a MongoDB database.

---

## 🚀 Tech Stack
- **Node.js** — JavaScript runtime
- **Express.js** — Web framework for building REST APIs
- **MongoDB + Mongoose** — NoSQL database for storing users and expenses
- **JWT Authentication** — Secure login and route protection
- **bcrypt.js** — Password hashing
- **dotenv** — Environment variable management
- **CORS** — Cross-Origin Resource Sharing setup for frontend connection

---

## 🧩 Folder Structure
┣ src/
┃ ┣ config/ # MongoDB connection
┃ ┣ controllers/ # Logic for routes (auth, expenses)
┃ ┣ middleware/ # Authentication middleware
┃ ┣ models/ # Mongoose schemas
┃ ┣ routes/ # Route definitions
┃ ┗ server.js # Entry point
┣ .env
┣ package.json
┗ README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker/backend

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file inside the backend/ directory with the following keys:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


4️⃣ Run the Server
npm run dev

API Overview
Endpoint	Method	Description
/api/auth/register	POST	Register new user
/api/auth/login	POST	Authenticate and get token
/api/expenses	GET	Get all user expenses (protected)
/api/expenses	POST	Add new expense
/api/expenses/:id	PUT	Update expense
/api/expenses/:id	DELETE	Delete expense

All /api/expenses routes require a valid JWT token in headers.

Notes
Uses CORS to allow requests from frontend (default http://localhost:5173).

Validates and filters expenses by category, date range, and search keywords.

Handles authentication with JWT tokens stored in localStorage on the frontend.

