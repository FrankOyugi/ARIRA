const { default: axios } = require("axios");

const paymentRoute = require("express").Router();

paymentRoute.get("/pay/:pn/:amount", async (req, res, next) => {
  let token = process.env.DARAJA_TOKEN;
  let url = process.env.MPESA_AUTH_URL;
  const auth = `Basic ${token}`;

  axios
    .get(url, { headers: { Authorization: auth } })
    .then(({ data }) => {
      console.log(data);
      req.token = data["access_token"];
      req.pn = req.params.pn;
      req.amount = req.params.amount;
      return next();
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

paymentRoute.post("/daraja", (req, res) => {
  const paymentData = req.body;
  console.log(paymentData);
  res.json(paymentData);
});

module.exports = paymentRoute;
