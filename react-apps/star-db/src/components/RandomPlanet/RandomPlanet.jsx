import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import PlanetView from './PlanetView';
import ErrorIndicator from '../ErrorIndicator';
import Loader from '../Loader';
import './RandomPlanet.scss';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  static defaultProps = {
    updateInterval: 3000
  };

  state = {
    planet: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

    const spinner = loading ? <Loader loading={this.state.loading}/> : null;
    const content = hasData ? <PlanetView planet={this.state.planet} /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;

    return (
      <div className="random-planet jumbotron rounded ml-5 mr-5">
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}