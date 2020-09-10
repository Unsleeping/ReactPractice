import React from 'react';
import ItemDetails from '../ItemDetails';
import { WithSwapiService } from '../HOCHelpers';
import Record from '../Record';

const PersonDetails = ({ itemId, swapiService }) => {
  const { getPerson, getPersonImage } = swapiService;
  return (
    <ItemDetails 
        itemId={itemId}
        getData={getPerson}
        getImageUrl={getPersonImage}>
      <Record field="gender" label="Gender"/>
      <Record field="birthYear" label="Birth Year"/>
      <Record field="eyeColor" label="Eye Color"/>
    </ItemDetails>
  );
};

export default WithSwapiService(PersonDetails);