import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorIndicator from '../ErrorIndicator';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../ErrorBoundry';
import PeoplePage from '../Pages/PeoplePage';
import PlanetPage from '../Pages/PlanetsPage';
import StarshipsPage from '../Pages/StarshipsPage';
import { SwapiServiceProvider } from '../SwapiServiceContext';

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
          <Router>
            <Header />
            <RandomPlanet />
            <Route path="/people" component={PeoplePage} />
            <Route path="/planets" component={PlanetPage} />
            <Route path="/starships" component={StarshipsPage} />
          </Router> 
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
