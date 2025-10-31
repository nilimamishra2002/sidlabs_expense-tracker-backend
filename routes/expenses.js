const express = require("express");
const Expense = require("../models/expense");
const router = express.Router();
const validateExpense = require("../middleware/validateExpense");
const auth = require("../middleware/authMiddleware");


// Protect all expense routes
router.use(auth);

// Create new expense
router.post("/", auth, validateExpense, async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      user: req.user.userId,  //  link expense to logged-in user
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all (with optional filters) - only for logged-in user
router.get("/",auth, async (req, res) => {
  console.log("Fetching expenses for user:", req.user.userId);
  try {
    const { category, from, to } = req.query;
    const filter = { user: req.user.userId }; // only fetch expenses for logged-in user

    if (category) filter.category = category;
    if (from || to) filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one by ID (user must own it)
router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.userId });
    if (!expense) return res.status(404).json({ error: "Not found" });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!deleted) return res.status(404).json({ error: "Not found or not allowed" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update
router.put("/:id", validateExpense, async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found or not allowed" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
