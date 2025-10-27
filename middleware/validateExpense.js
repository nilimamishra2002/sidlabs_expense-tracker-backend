module.exports = function validateExpense(req, res, next) {
  const { title, amount, category, date } = req.body;
  if (!title || amount == null || !category || !date) {
    return res.status(400).json({ error: "All fields required" });
  }
  next();
};
