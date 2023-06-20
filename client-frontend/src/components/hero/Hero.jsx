import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import classes from './hero.module.css'

const Hero = () => {
  const [type, setType] = useState("bedsitter")
  const [continent, setContinent] = useState("0")
  const [priceRange, setPriceRange] = useState("0")

  const handleSearch = () => {

  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your dream place right now</h2>
        <h5>Search the best selection of luxury real estate in Nairobi</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select type</option>
            <option value="bedsitter">Bedsitter</option>
            <option value="onebedroom">One Bedroom</option>
            <option value="twobedroom">Two Bedroom</option>
            <option value="threebedroom">Three Bedroom</option>
            <option value="fourbedroom">Four Bedroom</option>
            <option value="fivebedroomplus">Five Bedroom +</option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select Price Range</option>
            <option value="0">0-10,000</option>
            <option value="1">10,000-40,000</option>
            <option value="2">40,000-70,000</option>
            <option value="3">70,000-150,000</option>
            <option value="4">160,000-300,000</option>
          </select>
          <select onChange={(e) => setContinent(e.target.value)}>
            <option disabled>Select Furnishing preference</option>
            <option value="0">Furnished </option>
            <option value="0">Unfurnished</option>
            <option value="0">Either</option>
          </select>
          <AiOutlineSearch className={classes.searchIcon}/>
        </div>
      </div>

    </div>
  )
}

export default Hero