import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the wep application</h2>
          <p>Apex House Rentals is a web application that has been developed to connect tenants and real estate agents.This website can be used to either look for a rental property,or advertise a rental property.</p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +254700505050</span>
          <span>Youtube: Apex House Rentals</span>
          <span>Twitter: Apex House Rentals</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Country:Kenya</span>
          <span>City:Nairobi</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer