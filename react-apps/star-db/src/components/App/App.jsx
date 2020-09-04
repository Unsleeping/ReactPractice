import React, { Component } from 'react';
import './App.scss';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorIndicator from '../ErrorIndicator';
import PeoplePage from '../PeoplePage/PeoplePage';

import ItemList from '../ItemList';
import Record from '../Record';

import SwapiService from '../../services/swapi-service';
import ItemDetails from '../ItemDetails';
import ErrorBoundry from '../ErrorBoundry';

import { PersonList, PersonDetails, PlanetList, PlanetDetails, StarshipList, StarshipDetails } from '../StarWarsComponents';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({hasError: true})
  }

  render(){

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
        <ErrorBoundry>
          <Header />
          <RandomPlanet />

          <PersonDetails itemId={11}/>

          <PlanetDetails itemId={11}/>

          <StarshipDetails itemId={11}/>

          <PersonList>
            {({name}) => <span>{name}</span>}
          </PersonList>

          <StarshipList>
            {({name}) => <span>{name}</span>}
          </StarshipList>

          <PlanetList>
            {({name}) => <span>{name}</span>}
          </PlanetList>
          {/* <PeoplePage />
          
          <ItemDetails 
            getData={this.swapiService.getStarship}
            itemId={9} 
            getImageUrl={this.swapiService.getStarshipImage}>
            <Record field="model" label="Model" />
            <Record field="length" label="Length" />
            <Record field="costInCredits" label="cost" />
          </ItemDetails> */}
        </ErrorBoundry>
    );
  }
}
