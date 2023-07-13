const tokenController = require("express").Router();

tokenController.get("/token", async (req, res, next) => {
  generateToken();
  res.send("token generated successfully");
});
