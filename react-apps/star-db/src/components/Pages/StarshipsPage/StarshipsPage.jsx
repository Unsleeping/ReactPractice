import React from 'react';
import { withRouter } from 'react-router-dom';
import './StarshipsPage.scss';
import ErrorBoundry from '../../ErrorBoundry';
import { StarshipsList } from '../../StarWarsComponents';

const StarshipsPage = ({ history }) => {
  return (
    <ErrorBoundry>
      <StarshipsList onItemSelected={(id) => history.push(id)} />
    </ErrorBoundry>
  );
};

export default withRouter(StarshipsPage);