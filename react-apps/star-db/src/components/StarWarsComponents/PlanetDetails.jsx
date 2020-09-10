import React from 'react';
import ItemDetails from '../ItemDetails';
import { WithSwapiService } from '../HOCHelpers';
import Record from '../Record';

const PlanetDetails = ({ itemId, swapiService }) => {
  const { getPlanetImage, getPlanet } = swapiService;
  return (
    <ItemDetails 
        itemId={itemId}
        getData={getPlanet}
        getImageUrl={getPlanetImage}>
      <Record field="gender" label="Gender"/>
      <Record field="birthYear" label="Birth Year"/>
      <Record field="eyeColor" label="Eye Color"/>
    </ItemDetails>
  );
};

export default WithSwapiService(PlanetDetails);