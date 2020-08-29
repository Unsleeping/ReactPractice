import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import './RandomPlanet.scss';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {}
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({planet});
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 20) + 1;
    this.swapiService.getPlanet(id).then(this.onPlanetLoaded);
  }

  render() {

    const { planet: { id, name, population, rotationPeriod, diameter } } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} 
        />
        <img className="planet-image"
              src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}