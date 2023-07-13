const axios = require("axios");

module.exports.tokenController = async (req, res, next) => {
  const URL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const bs_short_code = process.env.MPESA_BUSINESS_SHORT_CODE;
  const passkey = process.env.MPESA_PASS_KEY;
  const partyA = process.env.MPESA_PARTYA;
  const partyB = process.env.MPESA_PARTYB;

  const token = req.token;

  if (!token) {
    res.send("No token found");
    return;
  }

  const auth = `Bearer ${token}`;
  const timestamp = require("../helpers/time").getCurrentTimestamp();
  const password = new Buffer.from(
    `${bs_short_code}${passkey}${timestamp}`
  ).toString("base64");
  const transcation_type = "CustomerPayBillOnline";
  const amount = req.amount;
  const phoneNumber = req.pn;
  const callBackUrl = "https://d630-102-140-206-115.ngrok-free.app/daraja";
  const accountReference = "lipa-na-mpesa-tutorial";
  const transaction_desc = "Testing lipa na mpesa functionality";

  console.log("Phone number is ", phoneNumber);

  axios
    .post(
      URL,
      {
        BusinessShortCode: bs_short_code,
        Password: password,
        Timestamp: timestamp,
        TransactionType: transcation_type,
        Amount: amount,
        PartyA: partyA,
        PartyB: bs_short_code,
        PhoneNumber: phoneNumber,
        CallBackURL: callBackUrl,
        AccountReference: accountReference,
        TransactionDesc: transaction_desc,
      },
      {
        headers: {
          Authorization: auth,
        },
      }
    )
    .then(({ data }) => {
      console.log(data);
      res.send("Success");
    })
    .catch((err) => {
      console.log(err);
      res.send({
        success: false,
        message: console.log("There was an error"),
      });
    });
};
