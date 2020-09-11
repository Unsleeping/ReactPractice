import React from 'react';
import ItemDetails from '../ItemDetails';
import { WithSwapiService } from '../HOCHelpers';
import Record from '../Record';

const PersonDetails = (props) => {
  return (
    <ItemDetails {...props} >
      <Record field="gender" label="Gender" />
      <Record field="birthYear" label="Birth Year" />
      <Record field="eyeColor" label="Eye Color" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage
  }
};

export default WithSwapiService(mapMethodsToProps)(PersonDetails);