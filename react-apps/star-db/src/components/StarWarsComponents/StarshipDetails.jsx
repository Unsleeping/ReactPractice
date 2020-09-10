import React from 'react';
import ItemDetails from '../ItemDetails';
import { WithSwapiService } from '../HOCHelpers';
import Record from '../Record';

const StarshipDetails = (props) => {
  return (
    <ItemDetails {...props} >
      <Record field="model" label="Model" />
      <Record field="length" label="Length" />
      <Record field="costInCredits" label="cost" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage
  }
};

export default WithSwapiService(StarshipDetails, mapMethodsToProps);