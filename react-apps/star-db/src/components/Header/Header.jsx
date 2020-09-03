import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <div className="header d-flex container">
      <h3>
        <a href="#">
          Star DB
        </a>
      </h3>
      <ul className="d-flex">
        <li>
          <a href="#">People</a>
        </li>
        <li>
          <a href="#">Planets</a>
        </li>
        <li>
          <a href="#">Starships</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;