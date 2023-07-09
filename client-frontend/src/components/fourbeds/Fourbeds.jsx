import React, { useEffect, useState } from 'react'
import classes from './fourbeds.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import person from '../../assets/person.jpg'
import {FaBath, FaSquareFull} from 'react-icons/fa'

const Fourbeds = () => {
    const [filteredProperties, setFilteredProperties] = useState([])
    return(
        <div className={classes.container}>
            <div className={classes.wrapper}>
                {filteredProperties?.length > 0 ? (
                    <>
                    <div className={classes.titles}>
                        <h5>Selected properties</h5>
                        <h2>Property you may like</h2>
                    </div>
                    <div className={classes.properties}>
                        {filteredProperties.map((property) => (
                            <div key={property._id} className={classes.property}>
                                <Link className={classes.imgContainer} to={`/propertyDetail/${property._id}`}>
                                    <img src={`http://localhost:3005/images/${property?.img}`} alt =""/>
                                </Link>
                                <div className={classes.details} to={`/propertyDetail/${property._id}`}>
                                    <div className={classes.priceAndOwner}>
                                        <span className={classes.price}>ksh {property.price}</span>
                                        <img src={person} className={classes.owner} alt=""/>
                                    </div>
                                    <div className={classes.moreDetails}>
                                        <span>{property.baths} <FaBath className={classes.icon}/></span>
                                        <span>{property.sqmeters} <FaSquareFull className={classes.icon}/></span>
                                    </div>
                                    <div className={classes.title}>
                                        {property.title}
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

export default Fourbeds
