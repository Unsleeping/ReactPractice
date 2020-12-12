import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './WelcomePage.scss';

const WelcomePage = () => {
  return (
    <>
      <div className="WelcomePage">
        <Header />
        <div className="WelcomePage-wrapper">
          <h1>Добро пожаловать на наш сайт</h1>
          <Link to="/signup" className="reset-link">
            <Button type="button" variant="outlined" color="primary">
              Начать использовать
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WelcomePage;
