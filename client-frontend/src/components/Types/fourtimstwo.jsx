import React, { useState } from 'react';

const HouseList = () => {
  // Sample list of houses
  const properties = [
    { id: 1, type: 'One Bedroom', location: 'City A' },
    { id: 2, type: 'Two Bedroom', location: 'City B' },
    { id: 3, type: 'Three Bedroom', location: 'City C' },
    // ... additional houses
  ];

  const [selectedType, setSelectedType] = useState('');

  const handleLinkClick = (type) => {
    setSelectedType(type);
  };

  const filteredHouses = selectedType
    ? houses.filter((house) => house.type === selectedType)
    : houses;

  return (
    <div>
      <h2>House List</h2>
      <div>
        <a href="#" onClick={() => handleLinkClick('One Bedroom')}>
          One Bedroom
        </a>
        <a href="#" onClick={() => handleLinkClick('Two Bedroom')}>
          Two Bedroom
        </a>
        <a href="#" onClick={() => handleLinkClick('Three Bedroom')}>
          Three Bedroom
        </a>
      </div>
      <ul>
        {filteredHouses.map((house) => (
          <li key={house.id}>
            <strong>Type:</strong> {house.type} | <strong>Location:</strong>{' '}
            {house.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HouseList;