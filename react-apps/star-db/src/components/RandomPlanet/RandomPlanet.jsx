import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import PlanetView from './PlanetView';
import './RandomPlanet.scss';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: lime;
`;

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 18) + 2;
    this.swapiService.getPlanet(id).then(this.onPlanetLoaded);
  }

  render() {

    const { loading } = this.state;

    const spinner = loading ? <CircleLoader css={override} size={150} color={"teal"} loading={this.state.loading}/> : null;
    const content = !loading ? <PlanetView planet={this.state.planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
      </div>
    );
  }
}