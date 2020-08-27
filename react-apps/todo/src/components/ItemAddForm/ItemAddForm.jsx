import React, { Component } from 'react';
import './ItemAddForm.scss';

export default class ItemAddForm extends Component {
  render() {
    const { onItemAdded } = this.props;
    return (
      <div className="item-add-form">
        <button 
          className="btn btn-outline-secondary"
          onClick={() => onItemAdded('Hello')}>Add Item</button>
      </div>
    );
  }
}