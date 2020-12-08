import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './PageNotFound.scss';

const PageNotFound = () => {
  return (
    <div className="PageNotFound">
      <div className="PageNotFound-wrapper">
        <h1>404</h1>
        <h4>the page you're looking for was not found</h4>
        <Link to="/" className="reset-link">
          <Button type="button" variant="text" color="primary">
            Go to the homepage
          </Button>
        </Link>
      </div>
      <div class="waveWrapper waveAnimation">
        <div class="waveWrapperInner bgTop">
          <div class="wave waveTop"></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div class="wave waveMiddle"></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div class="wave waveBottom"></div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
