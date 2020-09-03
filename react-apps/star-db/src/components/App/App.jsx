import React, { Component } from 'react';
import './App.scss';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorIndicator from '../ErrorIndicator';
import PeoplePage from '../PeoplePage/PeoplePage';
import ItemList from '../ItemList';
import SwapiService from '../../services/swapi-service';
import ItemDetails from '../ItemDetails';

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
      <div>
        <Header />
        <RandomPlanet />

        <PeoplePage />
        
        <ItemDetails getData={this.swapiService.getStarship}
                      itemId={9} 
                      getImageUrl={this.swapiService.getStarshipImage}
                      />

        {/* <ItemList onItemSelected={this.onPersonSelected} 
                    getData={this.swapiService.getAllPlanets}
                    renderItem={(item) => item.name} /> */}
      </div>
    );
  }
}
