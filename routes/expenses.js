const express = require("express");
const Expense = require("../models/expense");
const router = express.Router();

// Create a new expense
router.post("/", async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    if (!title || amount == null || !category || !date) {
      return res.status(400).json({ error: "All fields required" });
    }
    const expense = await Expense.create({ title, amount, category, date });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const { category, from, to } = req.query;
    const filter = {};
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

// Delete an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const exp = await Expense.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
