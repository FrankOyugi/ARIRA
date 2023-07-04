import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import classes from './hero.module.css'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const [type, setType] = useState("bedsitter")
  const [priceRange, setPriceRange] = useState("0")
  const navigate = useNavigate()

  const handleSearch = () => {
  //navigate to properties
  navigate(`/properties?type=${type}&priceRange=${priceRange}`)

  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let us find a home that suits your needs</h2>
        <h5>Search for the best home</h5>
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
            <option value="2">40,000-75,000</option>
            <option value="3">75,000-120,000</option>
            <option value="4">120,000-500,000</option>
          </select>
          <form action="" className={classes.searchBar}>
            <input type="text" placeholder="Enter Location..."/>
          </form>
          <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon}/>
        </div>
      </div>

    </div>
  )
}

export default Hero