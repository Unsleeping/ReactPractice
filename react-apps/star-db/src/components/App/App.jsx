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
import SecretPage from '../Pages/SecretPage';
import LoginPage from '../Pages/LoginPage';
import { StarshipDetails } from '../StarWarsComponents';
import { SwapiServiceProvider } from '../SwapiServiceContext';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    hasError: false,
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({ isLoggedIn: true })
  };

  componentDidCatch() {
    this.setState({hasError: true})
  }

  render(){
    const { hasError, isLoggedIn } = this.state;

    if (hasError) {
      return <ErrorIndicator />;
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <Router>
            <Header />
            <RandomPlanet />
            <Route exact path="/" render={() => <h2>Welcome to StarDB</h2>} />
            <Route path="/people/:id?" component={PeoplePage} />
            <Route path="/planets" component={PlanetPage} />
            <Route exact path="/starships" component={StarshipsPage} />
            <Route path="/login" render={() => <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />} />
            <Route path="/secret" render={() => <SecretPage isLoggedIn={isLoggedIn} />} />
            <Route path="/starships/:id" render={({ match }) => {
              const { id } = match.params;
              return <StarshipDetails itemId={id} />;
              }} />
          </Router> 
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
