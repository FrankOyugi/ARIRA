import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the app</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, repellat. Voluptates, vero. Assumenda excepturi quisquam, soluta hic iure iste doloribus provident adipisci, quo sequi accusantium minima, sint dicta exercitationem voluptates!</p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +123456789</span>
          <span>Youtube: WebDevMania</span>
          <span>GitHub: WebDevMania</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent:Europe</span>
          <span>Country:Bulgaria</span>
          <span>Current Location:Bulgaria</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer