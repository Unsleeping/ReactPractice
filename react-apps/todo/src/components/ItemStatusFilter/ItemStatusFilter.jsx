import React, { Component } from 'react';
import './ItemStatusFilter.scss';
import BtnStatusFilter from './BtnStatusFilter';

export default class ItemStatusFilter extends Component {

  state = {
    All: true,
    Active: false,
    Done: false
  };

  onToggleClick = (type) => {
    this.props.onStatusFilter(type);
    this.setState((state) => {
      const newObj = {
        All: false,
        Active: false,
        Done: false
      };
      newObj[type] = !state[type];
      return newObj
    });
  };

  render() {
    return (
      <div className="btn-group">
        <BtnStatusFilter text={'All'} onToggleClick={this.onToggleClick} active={this.state.All} />
        <BtnStatusFilter text={'Active'} onToggleClick={this.onToggleClick} active={this.state.Active} />
        <BtnStatusFilter text={'Done'} onToggleClick={this.onToggleClick} active={this.state.Done} />
      </div>
    );
  }
}