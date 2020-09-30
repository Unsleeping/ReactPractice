import React from 'react';
import { withRouter } from 'react-router-dom';
import './PeoplePage.scss';
import { PersonDetails, PersonList } from '../../StarWarsComponents';
import Row from '../../Row';
import ErrorBoundry from '../../ErrorBoundry';

const PeoplePage = ({ match, history }) => {
  return (
    <ErrorBoundry>
      <Row left={<PersonList onItemSelected={(id) => history.push(id)} />} right={<PersonDetails itemId={match.params.id} />}/>
    </ErrorBoundry>
  );
};

export default withRouter(PeoplePage);