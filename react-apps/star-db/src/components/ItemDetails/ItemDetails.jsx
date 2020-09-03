import React, { Component } from 'react';
import './ItemDetails.scss';
import SwapiService from '../../services/swapi-service';
import Loader from '../Loader';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: true
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) this.updateItem();
  }
  
  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
          image: getImageUrl(item),
          loading: false
        });
      });
  }

  render() {

    const { item, image } = this.state;

    if (!item) {
      return <span>Select an item from a list</span>;
    }

    const { item: { id, name, gender, birthYear, eyeColor }, loading  } = this.state;

    if (loading) return <Loader loading={this.state.loading}/>

    return (
      <div className="item-details card mr-5">
        <img className="item-image" alt="character"
          src={image} />

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