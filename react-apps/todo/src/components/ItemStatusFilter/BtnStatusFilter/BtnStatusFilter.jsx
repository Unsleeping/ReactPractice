import React, { Component } from 'react';
import './BtnStatusFilter.scss';

export default class BtnStatusFilter extends Component {
  render() {
    const { text, onFilterChange } = this.props;
    const classNames = this.props.active ? "btn btn-info" : "btn btn-outline-secondary";
    return (
      <button type="button"
              className={classNames}
              onClick={() => onFilterChange(text.toLowerCase())}>{text}</button>
    );
  }
}