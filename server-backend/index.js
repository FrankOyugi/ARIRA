const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const authController = require('./controllers/authController')
const propertyController = require('./controllers/propertyController')
const uploadController = require('./controllers/uploadController')
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

app.listen(process.env.PORT, () => console.log('Your server is running on port 3005'))


