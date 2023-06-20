import React, { useEffect, useState } from 'react'
import classes from './popularProperties.module.css'
import {Link} from 'react-router-dom'
import img1 from '../../assets/house.png'
import img2 from '../../assets/estate22.jpg'
import img3 from '../../assets/realestatecountryside.jpg'
import img4 from '../../assets/estate4.jpg'
import img5 from '../../assets/estate52.jpg'
import img6 from '../../assets/estate5.jpg'
import { request } from '../../util/fetchAPI'

const PopularProperties = () => {
  const [numProperties, setNumProperties] = useState({})
  
  useEffect(() => {
    const fetchNumberProperties = async() => {
      try {
        const data = await request('/property/find/types', "GET")
        setNumProperties(data)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchNumberProperties()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of properties</h5>
          <h2>Best type of properties for you</h2>
        </div>
        <div className={classes.properties}>
          <Link className={classes.property} to={'/properties?type=one&continent=1&priceRange=2'}>
            <img src={img1} />
            <div className={classes.quantity}>{numProperties?.bedsitter} properties</div>
            <h5>Bedsitter properties</h5>
          </Link>
          <Link className={classes.property} to={'/properties?type=two&continent=1&priceRange=2'}>
            <img src={img2} />
            <div className={classes.quantity}>{numProperties?.onebedroom} properties</div>
            <h5>One bedroom properties</h5>
          </Link>
          <Link className={classes.property} to={'/properties?type=three&continent=1&priceRange=2'}>
            <img src={img3} />
            <div className={classes.quantity}>{numProperties?.twobedroom} properties</div>
            <h5>Two bedroom properties</h5>
          </Link>
          <Link className={classes.property} to={'/properties?type=three&continent=1&priceRange=2'}>
            <img src={img4} />
            <div className={classes.quantity}>{numProperties?.threebedroom} properties</div>
            <h5>Three bedroom properties</h5>
          </Link>
          <Link className={classes.property} to={'/properties?type=three&continent=1&priceRange=2'}>
            <img src={img5} />
            <div className={classes.quantity}>{numProperties?.fourbedroom} properties</div>
            <h5>Four bedroom properties</h5>
          </Link>
          <Link className={classes.property} to={'/properties?type=three&continent=1&priceRange=2'}>
            <img src={img6} />
            <div className={classes.quantity}>{numProperties?.fivebedroomplus} properties</div>
            <h5>Five bedroom + properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties