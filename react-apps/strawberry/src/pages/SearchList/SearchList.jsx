import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_NAMES } from '../../constants/routeNames';

const SearchList = () => {
  const { newSearch } = ROUTE_NAMES.AUTHORISET;
  return <Link to={newSearch}>new search</Link>;
};

export default SearchList;
