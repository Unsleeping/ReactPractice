import React from 'react';
import ItemList from '../ItemList';
import { WithData, WithSwapiService, WithChildFunction, compose } from '../HOCHelpers';

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

const PersonList = compose(
                    WithSwapiService(mapPersonMethodsToProps),
                    WithData,
                    WithChildFunction(renderName)
                  )(ItemList);

const PlanetsList = compose(
                      WithSwapiService(mapPlanetMethodsToProps),
                      WithData,
                      WithChildFunction(renderName)
                    )(ItemList);

const StarshipsList = compose(
                        WithSwapiService(mapStarshipMethodsToProps),
                        WithData,
                        WithChildFunction(renderModelAndName)
                      )(ItemList);

export {PersonList, PlanetsList, StarshipsList};