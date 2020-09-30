import React from 'react';
import { withRouter } from 'react-router-dom';
import './StarshipsPage.scss';
import ErrorBoundry from '../../ErrorBoundry';
import { StarshipsList } from '../../StarWarsComponents';

const StarshipsPage = ({ history }) => {
  return (
    <ErrorBoundry>
      <StarshipsList onItemSelected={(itemId) => history.push(`/starships/${itemId}`)} />
    </ErrorBoundry>
  );
};

export default withRouter(StarshipsPage);