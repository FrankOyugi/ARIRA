import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Fourbedroomproperties = () => {
  // Sample list of items
  const properties = [
    { id: 1, name: 'Item 1', type: 'Type A' },
    { id: 2, name: 'Item 2', type: 'Type B' },
    { id: 3, name: 'Item 3', type: 'Type A' },
    { id: 4, name: 'Item 4', type: 'Type B' },
    { id: 5, name: 'Item 5', type: 'Type C' },
  ];

  const [selectedType, setSelectedType] = useState('');
  const filteredProperties = properties.filter(property => property.type === selectedType);

//   const handleTypeChange = e => {
//     setSelectedType(e.target.value);
//   };

  const fourbeds = properties.filter(property => property.type === 'fourbedroom');

  return (
    <div>
      <h2>Properties of Selected Type:</h2>
      {filteredProperties.length > 0 ? (
        <ul>
          {filteredItems.map(property => (
            <li key={property.id}>{property.name}</li>
          ))}
        </ul>
      ) : (
        <p>No items of the selected type found.</p>
      )}

      <Link to="/fourbeds">View All Type A Items</Link>
    </div>
  );
};

export default Fourbedroomproperties;