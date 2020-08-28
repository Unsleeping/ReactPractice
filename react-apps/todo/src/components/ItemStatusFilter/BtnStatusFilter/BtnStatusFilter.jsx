import React, { Component } from 'react';
import './BtnStatusFilter.scss';

export default class BtnStatusFilter extends Component {
  onClick = () => {
    const { text, onToggleClick } = this.props;
    onToggleClick(text)
  };

  render() {
    const { text } = this.props;
    const classNames = this.props.active ? "btn btn-info" : "btn btn-outline-secondary";
    return (
      <button type="button"
              className={classNames}
              onClick={this.onClick}>{text}</button>
    );
  }
};