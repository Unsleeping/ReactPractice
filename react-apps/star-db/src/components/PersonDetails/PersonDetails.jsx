import React, { Component } from 'react';
import './PersonDetails.scss';
import SwapiService from '../../services/swapi-service';

import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: lime;
`;

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) this.updatePerson();
  }
  
  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService.getPerson(personId)
      .then((person) => {
        this.setState({ 
          person,
          loading: false
        });
      });
  }

  render() {

    if (!this.state.person) {
      return <span>Select a person from a list</span>;
    }

    const { person: { id, name, gender, birthYear, eyeColor }, loading  } = this.state;

    if (loading) return <CircleLoader css={override} size={150} color={"teal"} loading={this.state.loading}/>

    return (
      <div className="person-details card mr-5">
        <img className="person-image" alt="character"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}