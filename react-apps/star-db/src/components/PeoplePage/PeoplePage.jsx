import React, { Component } from 'react';
import './PeoplePage.scss';
import ItemList from '../ItemList';
import PersonDetails from '../PersonDetails';
import ErrorIndicator from '../ErrorIndicator';
import SwapiService from '../../services/swapi-service';
import Row from '../Row';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: null,
    hasError: false
  };

  componentDidCatch() {
    this.setState({hasError: true});
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <ItemList onItemSelected={this.onPersonSelected} 
                    getData={this.swapiService.getAllPeople}
                    renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}/>
    );

    const personDetails = <PersonDetails personId={this.state.selectedPerson} />;

    return (
      <Row left={itemList} right={personDetails}/>
    );
  }
}