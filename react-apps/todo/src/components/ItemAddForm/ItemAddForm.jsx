import React, { Component } from 'react';
import './ItemAddForm.scss';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    const { onItemAdded } = this.props;
    const { label } = this.state;
    e.preventDefault();
    onItemAdded(label);
    this.setState({
      label: ''
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input type="text"
                onChange={this.onLabelChange} 
                className="form-control" 
                placeholder="What needs to be done"
                value={label} />
        <button 
          className="btn btn-outline-secondary">Add</button>
      </form>
    );
  }
}