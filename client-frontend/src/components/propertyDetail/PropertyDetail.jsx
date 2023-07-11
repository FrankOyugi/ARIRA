import React, { useEffect, useRef, useState } from 'react'
import classes from './propertyDetail.module.css'
import { useSelector } from 'react-redux'
import { request } from '../../util/fetchAPI'
import { useParams } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { FaBath, FaSquareFull } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
// import MpesaPay from 'mpesapay'


const PropertyDetail = () => {
  const {user} = useSelector((state) => state.auth)
  const [propertyDetail, setPropertyDetail] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const {id} = useParams()
  const formRef = useRef()

const serviceId = process.env.REACT_APP_SERVICE_ID
const templateId = process.env.REACT_APP_TEMPLATE_ID
const publicKey = process.env.REACT_APP_PUBLIC_KEY
// const Consumer_Key = process.env.REACT_APP_MPESA_CONSUMER_KEY
// const Consumer_Secret = process.env.REACT_APP_MPESA_CONSUMER_SECRET
// const Business_Short_code = process.env.REACT_APP_MPESA_BUSINESS_SHORT_CODE
// const Passkey = process.env.REACT_APP_MPESA_PASS_KEY
// const PartyA = process.env.REACT_APP_MPESA_PARTYA
// const B2C_Security_Credential = process.env.REACT_APP_MPESA_B2C_SECURITY_CREDENTIAL
// const Initiator_Name = process.env.REACT_APP_MPESA_INITIATOR_NAME
// const Environment = 'sandbox | live'


// const mpesapay = new Mpesapay(
//   Consumer_Key,
//   Consumer_Secret,
//   Business_Short_code,
//   Passkey,
//   PartyA,
//   B2C_Security_Credential,
//   Initiator_Name,
//   Environment
// );
//   async function initiatePayment(amount, phoneNumber, callbackUrl) {
//     try {
//       const response = await mpesapay.stkPush(amount, phoneNumber, callbackUrl);
//       console.log(response)
//       //Handle response data
//     } catch (error) {
//       console.error(error);
//       //Handle errors
//     }
//   }

//   //Call the function to initiate a payment
//   const amount = '10';
//   const phoneNumber = '254700513468';
//   const callbackUrl = 'https';
//   initiatePayment(amount, phoneNumber, callbackurl);

  useEffect(() => {
     const fetchDetails = async() => {
      try {
        const data = await request(`/property/find/${id}`, 'GET')
        setPropertyDetail(data)
      } catch (error) {
        console.error(error)
      }
     }
     fetchDetails()
  }, [id])

  const handleCloseForm = () => {
    setShowForm(false)
    setTitle("")
    setDesc("")
  }
  
  const handelcontactOwner = async(e) => {
    e.preventDefault()

    //to send email logic
  emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
  .then((result) => console.log(result))
  .catch((err) => console.log(err))

  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:3005/images/${propertyDetail?.img}`} alt="" />
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {`${propertyDetail?.title}`}
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndLocation}>
              <div>Type: <span>{`${propertyDetail?.type}`}</span></div>
              <div>Location: <span>{`${propertyDetail?.location}`}</span></div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price}><span>Price: ksh: </span>{`${propertyDetail?.price}`}</span>
              <span style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                Owner <img src={`http://localhost:3005/images/${propertyDetail?.currentOwner?.profileImg}`} className={classes.owner} alt=""/>
              </span>
            </div>
            <div className={classes.moreDetails}>
              <span>{propertyDetail?.baths} <FaBath className={classes.icon}/></span>
              <span>{propertyDetail?.sqmeters} <FaSquareFull className={classes.icon}/></span>
            </div>
          </div>
          <p className={classes.desc}>
            Description: <span>{`${propertyDetail?.desc}`}</span>
          </p>
          <button onClick={() => setShowForm(true)} className={classes.contactOwner}>
            Contact Owner
          </button>
          <button className={classes.payment}>
           Make Payment
          </button>
        </div>
      </div>
      {
        showForm && (
          <div className={classes.contactForm} onClick={handleCloseForm}>
            <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
               <h2>Send Email To owner</h2>
               <form onSubmit={handelcontactOwner} ref={formRef}>
                  <input value={user?.email} type="text" placeholder='My email' name="from_email"/>
                  <input value={user?.username} type="text" placeholder='My username' name="from_username"/>
                  <input value={propertyDetail.currentOwner.email} type="email" placeholder='Owner email' name="to_email"/>
                  <input type="text" placeholder='Title' name="from_title"/>
                  <input type="text" placeholder='Desc' name="message"/>
                  <button>Send</button>
               </form>
               <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default PropertyDetail