const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const authController = require('./controllers/authController')
const propertyController = require('./controllers/propertyController')
const uploadController = require('./controllers/uploadController')
const paymentController = require('./controllers/paymentController')
const app = express()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,useUnifiedTopology:true
},)
.then(() => console.log('MongoDB has started successfully'))

.catch((err) => {console.error(err); });
app.use('/images', express.static('public/images'))


//routes and middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/auth", authController)
app.use("/property", propertyController)
app.use("/upload", uploadController)
app.use(paymentController)
app.use(async (req, res, next) => {
    let token = req.token;
    if (!token) next()
    let auth = `Bearer ${token}`;       

    //getting the timestamp
    const date = new Date();
    const timestamp = 
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

    let url = process.env.MPESA_AUTH_URL;
    let bs_short_code = process.env.MPESA_BUSINESS_SHORT_CODE;
    let passkey = process.env.MPESA_PASS_KEY;

    let password = new Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
    let transcation_type = "CustomerPayBillOnline";
    let amount = req.amount; //you can enter any amount
    let partyA = req.pn; //should follow the format:2547xxxxxxxx
    let partyB = process.env.MPESA_PARTYB;
    let phoneNumber = req.pn; //should follow the format:2547xxxxxxxx
    let callBackUrl = "  https://e083-41-80-116-166.ngrok.io -> http://localhost:3005/callback";
    let accountReference = "lipa-na-mpesa-tutorial";
    let transaction_desc = "Testing lipa na mpesa functionality";

    try {

        let {data} = await axios.post(url,{
            "BusinessShortCode":bs_short_code,
            "Password":password,
            "Timestamp":timestamp,
            "TransactionType":transcation_type,
            "Amount":amount,
            "PartyA":partyA,
            "PartyB":partyB,
            "PhoneNumber":phoneNumber,
            "CallBackURL":callBackUrl,
            "AccountReference":accountReference,
            "TransactionDesc":transaction_desc
        },{
            "headers":{
                "Authorization":auth
            }
        }).catch(console.log);

        return res.send({
            success:true,
            message:data
        });

    }catch(err){

        return res.send({
            success:false,
            message:console.log("There was an error")
        });

    };
})

app.listen(process.env.PORT, () => console.log('Your server is running on port 3005'))


