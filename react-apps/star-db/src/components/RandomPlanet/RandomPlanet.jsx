import React, { Component } from 'react';

import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";

import SwapiService from '../../services/swapi-service';
import PlanetView from './PlanetView';
import ErrorIndicator from '../ErrorIndicator';
import './RandomPlanet.scss';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: lime;
`;

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 3000);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 18) + 2;
    this.swapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {

    const { loading, error } = this.state;

    const hasData = !(loading || error);

    const spinner = loading ? <CircleLoader css={override} size={150} color={"teal"} loading={this.state.loading}/> : null;
    const content = hasData? <PlanetView planet={this.state.planet} /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}