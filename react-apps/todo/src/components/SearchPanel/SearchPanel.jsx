import React, { Component } from 'react';

import './SearchPanel.scss';

export default class SearchPanel extends Component {
  onChange = (e) => {
    const { onFilter } = this.props;
    const value = e.target.value.toLowerCase();
    onFilter(value);
  };

  render(){
    return (
      <input type="text"
            className="form-control search-input"
            placeholder="type to search" 
            onChange={this.onChange}
            />
    );
  }
};
