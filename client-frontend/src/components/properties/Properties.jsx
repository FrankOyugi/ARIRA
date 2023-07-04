import React, { useEffect, useState } from 'react'
import classes from './properties.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import { arrPriceRanges } from '../../util/idxToPriceRange'
import { continentToIdx, idxToContinent } from '../../util/idxToContinent'
import person from '../../assets/person.jpg'
import {FaBed, FaSquareFull} from 'react-icons/fa'
import {AiOutlineSearch} from 'react-icons/ai'


const Properties = () => {
    const [allProperties, setAllPrperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState([])
    const [state, setState] = useState(null)
    const query = (useLocation().search).slice(1)
    const arrQuery = query.split("&")
    const navigate = useNavigate()

    const handleState = (e) => {
        setState(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    

    //fetch all properties
    useEffect(() => {
        const fetchAllProperties = async() => {
            const data = await request(`/property/getAll`, 'GET')
            setAllPrperties(data)
        }
        fetchAllProperties()
    }, [])

    //parsing query params
    useEffect(() => {
       if(arrQuery && allProperties?.length > 0 && state === null){
        let formattedQuery = {}

        arrQuery.forEach((option, idx) => {
            
            const key = option.split("=")[0]
            const value = option.split("=")[1]
        
            formattedQuery = {...formattedQuery, [key]: value}

            //if we are on last index,assign formatted query object to state
            if(idx === arrQuery.length - 1){
                console.log(formattedQuery)
                setState(formattedQuery)
                handleSearch(formattedQuery)
            }
        })
       }
    }, [allProperties, arrQuery])

    const handleSearch = (param = state) => {
      let options
      if(param?.nativeEvent){
        options = state
      }  else {
        options = param
      }

      const filteredProperties = allProperties.filter((property) => {
        //options.priceRange === 1 arrPriceRanges[1] =>second element => "100000-200000"
        const priceRange = arrPriceRanges[options.priceRange]
        const minPrice  = Number(priceRange.split('-')[0])
        const maxPrice  = Number(priceRange.split('-')[1])
        const continent = continentToIdx(property.continent)
        

        if(
            property.type === options.type
            && continent === Number(options.continent)
            && property.price >= minPrice && property.price <= maxPrice
        ) {
            return property
        }

      })

      const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRange}`

      navigate(`/properties?${queryStr}`, {replace: true})
      setFilteredProperties(filteredProperties)
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.options}>
                 <select value={state?.type} name = "type" onChange={handleState}>
                  <option disabled>Select type</option>
                  <option value="beach">Beach</option>
                  <option value="mountain">Mountain</option>
                  <option value="village">Village</option>
                 </select>
                 <select value={state?.priceRange} name = "priceRange" onChange={handleState}>
                  <option disabled>Select Price Range</option>
                  <option value="0">0-100,000</option>
                  <option value="1">100,000-200,000</option>
                  <option value="2">200,000-300,000</option>
                  <option value="3">300,000-400,000</option>
                  <option value="4">400,000-500,000</option>
                 </select>
                 <select value={state?.continent} name = "continent" onChange={handleState}>
                  <option disabled>Select Continent</option>
                  <option value="0">Europe</option>
                  <option value="1">Asia</option>
                  <option value="2">Africa</option>
                  <option value="3">South America</option>
                  <option value="4">North America</option>
                 </select>
                 <button className={classes.searchBtn}>
                   <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon}/>
                 </button>
                </div>
                {filteredProperties?.length > 0 ? (
                    <>
                    <div className={classes.titles}>
                        <h5>Selected properties</h5>
                        <h2>Properrty you may like</h2>
                    </div>
                    <div className={classes.properties}>
                        {filteredProperties.map((property) => (
                            <div key={property._id} className={classes.property}>
                                <Link classname={classes.imgContainer} to={`/propertyDetail/${property._id}`}>
                                    <img src={`http:/localhost:3005/images/${property?.img}`} alt =""/>
                                </Link>
                                <div className={classes.details}>
                                    <div className={classes.priceAndOwner}>
                                        <span className={classes.price}>$ {property.price}</span>
                                        <img src={person} className={classes.owner}/>
                                    </div>
                                    <div className={classes.moredetails}>
                                        <span>{property.beds} <FaBed classname={classes.icon}/></span>
                                        <span>{property.sqmeters} <FaSquareFull classname={classes.icon}/></span>
                                    </div>
                                    <div className={classes.desc}>
                                        {property.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                ) : <h2 className={classes.noProperty}>We have no properties with the specified options</h2> }
            </div>
        </div>
    )
}

export default Properties