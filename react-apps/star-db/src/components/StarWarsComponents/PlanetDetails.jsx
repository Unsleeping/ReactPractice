import React from 'react';
import ItemDetails from '../ItemDetails';
import { withSwapiService } from '../HOCHelpers';
import Record from '../Record';

const PlanetDetails = (props) => {
  return (
    <ItemDetails {...props} >
      <Record field="population" label="Population" />
      <Record field="rotationPeriod" label="Rotation Period" />
      <Record field="diameter" label="Diameter" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage
  }
};

export default withSwapiService(mapMethodsToProps)(PlanetDetails);