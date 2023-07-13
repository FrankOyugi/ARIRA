const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authController = require("./controllers/authController");
const propertyController = require("./controllers/propertyController");
const uploadController = require("./controllers/uploadController");
const paymentController = require("./controllers/paymentController");
const app = express();

require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB has started successfully"))

  .catch((err) => {
    console.error(err);
  });

app.use("/images", express.static("public/images"));

//routes and middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);
app.use("/property", propertyController);
app.use("/upload", uploadController);

// daraja
app.use(paymentController);
app.use(require("./middlewares/verifyFromDaraja").tokenController);



app.listen(process.env.PORT, () =>
  console.log("Your server is running on port 3005")
);

// const express = require('express')
// const mongoose = require('mongoose')
// const dotenv = require('dotenv').config()
// const cors = require('cors')
// const authController = require('./controllers/authController')
// const propertyController = require('./controllers/propertyController')
// const uploadController = require('./controllers/uploadController')
// const app = express()

// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser:true,useUnifiedTopology:true
// },)
// .then(() => console.log('MongoDB has started successfully'))

// .catch((err) => {console.error(err); });
// app.use('/images', express.static('public/images'))

// //routes and middlewares
// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use("/auth", authController)
// app.use("/property", propertyController)
// app.use("/upload", uploadController)

// const generateToken = (req, res, next)=>{
//     console.log(body)
// }
// //middleware function to generate token
// app.post("/stk",generateToken, async (req, res) =>{
//      const phone = req.body.phone.substring(1);
//      const amount = req.body.amount;

//      const date = new Date();
//      const timestamp =
//      date.getFullYear() +
//      ("0" + (date.getMonth() + 1)).slice(-2) +
//      ("0" + date.getDate()).slice(-2) +
//      ("0" + date.getHours()).slice(-2) +
//      ("0" + date.getMinutes()).slice(-2) +
//      ("0" + date.getSeconds()).slice(-2);

//      const shortcode = process.env.MPESA_BUSINESS_SHORT_CODE;
//      const passkey = process.env.MPESA_PASS_KEY;

//      const password = new Buffer.from(shortcode + passkey + timestamp).toString(
//         "base64"
//         );

//      await function axios.post(
//         "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
//         {
//                 BusinessShortCode: shortcode,
//                 Password: password,
//                 Timestamp: timestamp,
//                 TransactionType: "CustomerPayBillOnline",
//                 Amount: amount,
//                 PartyA:` 254${phone}`,
//                 PartyB: shortcode,
//                 PhoneNumber:` 254${phone}`,
//                 CallBackURL: "https://mydomain.com/pat",
//                 AccountReference:` 254${phone}`,
//                 TransactionDesc:"Test"
//         },
//         {
//             headers: {
//                 Authorization: `Bearer ${token}` ,
//             },
//         }
//      ).then((data)=>{
//         console.log(data)
//         res.status(200).json(data)
//      }).catch((err)=>{
//         console.log(err.message)
//         res.status(400).json(err.message)
//      })
// });

// app.listen(process.env.PORT, () => console.log('Your server is running on port 3005'))
