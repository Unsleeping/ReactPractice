import React, { Component } from 'react';
import './App.scss';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ItemList from '../ItemList';
import PersonDetails from '../PersonDetails';

export default class App extends Component {

  state = {
    selectedPerson: null
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };

  render(){
    return (
      <div>
        <Header />
        <RandomPlanet />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}
