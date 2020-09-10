import React from 'react';
import ItemDetails from '../ItemDetails';
import { WithSwapiService } from '../HOCHelpers';
import Record from '../Record';

const StarshipDetails = ({ itemId, swapiService }) => {
  const { getStarshipImage, getStarship } = swapiService;
  return (
    <ItemDetails 
        itemId={itemId}
        getData={getStarship}
        getImageUrl={getStarshipImage}>
      <Record field="gender" label="Gender"/>
      <Record field="birthYear" label="Birth Year"/>
      <Record field="eyeColor" label="Eye Color"/>
    </ItemDetails>
  );
};

export default WithSwapiService(StarshipDetails);