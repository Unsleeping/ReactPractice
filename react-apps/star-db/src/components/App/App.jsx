import React, { Component } from 'react';
import './App.scss';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorIndicator from '../ErrorIndicator';
import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../SwapiServiceContext';
import ErrorBoundry from '../ErrorBoundry';
import PeoplePage from '../Pages/PeoplePage';
import PlanetPage from '../Pages/PlanetsPage';
import StarshipsPage from '../Pages/StarshipsPage';

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

            <PeoplePage />
            <PlanetPage />
            <StarshipsPage />
            
          </SwapiServiceProvider>
        </ErrorBoundry>
    );
  }
}
