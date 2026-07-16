const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("authorization");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token.slice(7), "secret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};
