import React, { Component } from 'react';
import './PeoplePage.scss';
import { PersonDetails, PersonList } from '../../StarWarsComponents';
import Row from '../../Row';
import ErrorBoundry from '../../ErrorBoundry';

export default class PeoplePage extends Component {

  state = {
    selectedItem: null
  };

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;
    return (
      <ErrorBoundry>
        <Row left={<PersonList onItemSelected={this.onItemSelected} />} right={<PersonDetails itemId={selectedItem} />}/>
      </ErrorBoundry>
    );
  }
}