import React, { Component } from 'react';
import './PeoplePage.scss';
import ItemList from '../ItemList';
import ItemDetails from '../ItemDetails';
import SwapiService from '../../services/swapi-service';
import Row from '../Row';
import ErrorBoundry from '../ErrorBoundry';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: null
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };

  render() {

    const itemList = (
      <ItemList onItemSelected={this.onPersonSelected} 
                    getData={this.swapiService.getAllPeople}
                    renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}/>
    );

    const personDetails = <ItemDetails itemId={this.state.selectedPerson}
                                      getData={this.swapiService.getPerson}
                                      getImageUrl={this.swapiService.getPersonImage} />;

    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails}/>
      </ErrorBoundry>
    );
  }
}