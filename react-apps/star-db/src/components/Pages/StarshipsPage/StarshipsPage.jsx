import React, { Component } from 'react';
import './StarshipsPage.scss';
import { StarshipDetails, StarshipsList } from '../../StarWarsComponents';
import Row from '../../Row';
import ErrorBoundry from '../../ErrorBoundry';

export default class StarshipsPage extends Component {

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
        <Row left={<StarshipsList onItemSelected={this.onItemSelected} />} right={<StarshipDetails itemId={selectedItem} />}/>
      </ErrorBoundry>
    );
  }
}