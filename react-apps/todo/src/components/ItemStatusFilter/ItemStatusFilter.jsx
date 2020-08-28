import React, { Component } from 'react';
import './ItemStatusFilter.scss';
import BtnStatusFilter from './BtnStatusFilter';

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All'},
    { name: 'active', label: 'Active'},
    { name: 'done', label: 'Done'}
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({name, label}) => {
      const isActive = filter === name;
      return <BtnStatusFilter text={label} onFilterChange={onFilterChange} active={isActive} key={name} />
    });
    
    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}