import React, { Component } from 'react';
import './PeoplePage.scss';
import ItemList from '../ItemList';
import ItemDetails from '../ItemDetails';
import SwapiService from '../../services/swapi-service';
import Row from '../Row';
import ErrorBoundry from '../ErrorBoundry';
import Record from '../Record';

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
      <ItemList 
        onItemSelected={this.onPersonSelected} 
        renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}/>
    );

    const personDetails = (
      <ItemDetails 
          itemId={this.state.selectedPerson}
          getData={this.swapiService.getPerson}
          getImageUrl={this.swapiService.getPersonImage}>
        <Record field="gender" label="Gender"/>
        <Record field="birthYear" label="Birth Year"/>
        <Record field="eyeColor" label="Eye Color"/>
      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails}/>
      </ErrorBoundry>
    );
  }
}