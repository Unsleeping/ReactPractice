import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Footer from '../../components/Footer';
import './WelcomePage.scss';

const WelcomePage = () => {
  return (
    <>
      <div className="WelcomePage">
        <div className="WelcomePage-wrapper">
          <h1>Welcome to our website</h1>
          <Link to="/signup" className="reset-link">
            <Button type="button" variant="outlined" color="primary">
              Get started
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WelcomePage;
