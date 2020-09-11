import React, { Component } from 'react';
import './PlanetsPage.scss';
import { PlanetDetails, PlanetsList } from '../../StarWarsComponents';
import Row from '../../Row';
import ErrorBoundry from '../../ErrorBoundry';

export default class PlanetsPage extends Component {

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
        <Row left={<PlanetsList onItemSelected={this.onItemSelected} />} right={<PlanetDetails itemId={selectedItem} />}/>
      </ErrorBoundry>
    );
  }
}