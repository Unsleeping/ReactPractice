import React, { Component } from 'react';
import './App.scss';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorIndicator from '../ErrorIndicator';

import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../SwapiServiceContext';
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
          <SwapiServiceProvider value={this.swapiService}>
            <Header />
            <RandomPlanet />

            <PersonDetails itemId={11}/>

            <PlanetDetails itemId={11}/>

            <StarshipDetails itemId={11}/>

            <PersonList />

            <StarshipList />

            <PlanetList />
          </SwapiServiceProvider>
        </ErrorBoundry>
    );
  }
}
