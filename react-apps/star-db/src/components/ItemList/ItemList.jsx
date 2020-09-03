import React, { Component } from 'react';
import './ItemList.scss';
import SwapiService from '../../services/swapi-service';
import Loader from '../Loader';

export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    itemList: null
  };

  componentDidMount() {
    const { getData } = this.props;
    getData()
      .then((itemList) => {
        this.setState({
          itemList
        });
      });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const  { id } = item;
      const label = this.props.renderItem(item);

      return (
        <li className="list-group-item" key={id} onClick={() => this.props.onItemSelected(id)} >
          {label}
        </li>
      );
    });
  }

  render() {

    const { itemList } = this.state;

    if (!itemList) {
      return <Loader loading={this.state.loading}/>;
    }

    return (
      <ul className="item-list list-group ml-5" >
        {this.renderItems(itemList)}
      </ul>
    );
  }
}