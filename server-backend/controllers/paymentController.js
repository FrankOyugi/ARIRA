

const paymentController = require('express').Router()

paymentController.get("/pay/:pn/:amount", async (req, res, next) => {

  let consumer_key = process.env.MPESA_CONSUMER_KEY;
  let consumer_secret = process.env.MPESA_CONSUMER_SECRET;

  let url = process.env.LIPA_NA_MPESA_URL;

  //form a buffer of the consumer key and secret
  let buffer = new Buffer.from(consumer_key+":"+consumer_secret);

  let auth = `Basic ${buffer.toString('base64')}`;

  try{

      let {data} = await axios.get(url,{
          "headers":{
              "Authorization":auth
          }
      });

      req.token = data['access_token'];
      req.pn = req.params.pn;
      req.amount = req.params.amount;
      return next();

  }catch(err){

      return res.send({
          success:false,
          message:err['response']['statusText']
      });

  }
  
})

paymentController.post('/callback', (req, res) => {
    const paymentData = req.body;

    console.log(paymentData);
    res.json(paymentData);
 

    // if (status === 'success') {
    //   const Payment = require('./models/payment');
    //   const newPayment = new Payment(paymentdata);
    //   newPayment.save()
    //     .then((savedPayment) => {
    //       console.log('Payment data saved:', savedPayment);
    //       res.sendStatus(200);
    //     })
    //     .catch((error) => {
    //       console.error('Error saving payment data:', error);
    //       res.sendStatus(500);
    //     });
    // } else if (status === 'canceled') {
    //   console.log('Payment canceled:', message);
    //   res.sendStatus(200);
    // } else if (status === 'failed') {
    //   console.log('Payment failed:', message);
    //   res.sendStatus(200);
    // } else {
    //   console.log('Invalid payment status');
    //   res.sendStatus(400);
    // }
  });



module.exports = paymentController