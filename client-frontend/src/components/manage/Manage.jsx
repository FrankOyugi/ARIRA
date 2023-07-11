import React, { useEffect, useState } from 'react'
import { request } from '../../util/fetchAPI'

const Manage = () => {
    const [properties, setProperties] = useState([])

    useEffect(() => {

      fetchUserProperties()
    
}, [])
const fetchUserProperties = async () => {
    try {
        const response = await request('/property/find/userproperties', 'GET')
    
    if(response.ok) {
        const data = await response.json()
        setProperties(data.properties)
    } else {
        console.log("No properties found")
    }
    } catch (error) {
        console.error('Error fetching user properties')
    }
}



    return(
        <div>
      <h2>My Properties</h2>
      {properties.length > 0 ? (
        <ul>
          {properties.map((property) => (
            <li key={property._id}>{property.title}</li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  )
}

export default Manage