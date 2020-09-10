import React from 'react';
import { SwapiServiceConsumer } from '../SwapiServiceContext';

const WithSwapiService = (Wrapped) => {
  return (props) => {
    return (
      <SwapiServiceConsumer>
      {
        (swapiService) => {
          return (
            <Wrapped {...props} swapiService={swapiService} />
          );
        }
      }
    </SwapiServiceConsumer>
    );
  }
};

export default WithSwapiService;