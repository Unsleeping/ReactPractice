import React from 'react';
import ItemList from '../ItemList';
import { WithData, WithSwapiService } from '../HOCHelpers';

const withChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    );
  };
};

const renderName = ({ name }) => <span>{name}</span>;

const renderModelAndName = ({ model, name }) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  }
};

const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  }
};
const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  }
};

const PersonList = WithSwapiService(mapPersonMethodsToProps)(
                      WithData(
                        withChildFunction(renderName)(
                          ItemList)));

const PlanetsList = WithSwapiService(mapPlanetMethodsToProps)(
                      WithData(
                        withChildFunction(renderName)(
                          ItemList)));

const StarshipsList = WithSwapiService(mapStarshipMethodsToProps)(
                        WithData(
                          withChildFunction(renderModelAndName)(
                            ItemList)));

export {PersonList, PlanetsList, StarshipsList};