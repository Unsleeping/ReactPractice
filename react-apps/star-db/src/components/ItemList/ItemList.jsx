import React from 'react';
import './ItemList.scss';
import SwapiService from '../../services/swapi-service';
import WithData from '../HOCHelpers';

const ItemList = ({ data, renderItem, onItemSelected }) => {

  const renderItems = (arr) => {
    return arr.map((item) => {
      const  { id } = item;
      const label = renderItem(item);

      return (
        <li className="list-group-item" key={id} onClick={() => onItemSelected(id)} >
          {label}
        </li>
      );
    });
  };

  return (
    <ul className="item-list list-group ml-5" >
      {renderItems(data)}
    </ul>
  );
};

const { getAllPeople } = new SwapiService();

export default WithData(ItemList, getAllPeople);