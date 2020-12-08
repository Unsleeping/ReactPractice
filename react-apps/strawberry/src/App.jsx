import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTokenFromLocalStorage } from './utils/utils';
import checkToken from './services/checkToken';
import { setAuthenticationState } from './redux/ducks/authentication';
import { ROUTE_NAMES } from './constants/routeNames';
import './App.scss';

import SearchList from './pages/SearchList';
import Signup from './pages/Authentication/Signup';
import Signin from './pages/Authentication/Signin';
import PageNotFound from './pages/PageNotFound';
import WelcomePage from './pages/WelcomePage';
import ResultPage from './pages/ResultPage';
import NewSearch from './pages/SearchList/NewSearch';

import Loader from './components/Loader';

const App = () => {
  const [isLoaded, setLoadedState] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state) => state.authenticationReducer
  );

  setTimeout(() => {
    setLoadedState(true);
  }, 1000);

  // useEffect(async () => {
  //   getTokenFromLocalStorage();
  //   if (window.token && !isAuthenticated) {
  //     const result = await checkToken();
  //     if (result.detail !== 'Invalid token.')
  //       dispatch(setAuthenticationState(true));
  //   }
  //   setLoadedState(true);
  // }, []);

  const renderRoutes = () => {
    const { AUTHORISET, root, wrongPage } = ROUTE_NAMES;
    const { searchList, resultPage, newSearch } = AUTHORISET;

    if (isAuthenticated) {
      return (
        <Switch>
          <Route exact path={searchList} component={SearchList} />
          <Route exact path={resultPage} component={ResultPage} />
          <Route exact path={newSearch} component={NewSearch} />
          <Route path={wrongPage} component={PageNotFound} />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route exact path={root} component={WelcomePage} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path={wrongPage} component={PageNotFound} />
      </Switch>
    );
  };

  return <div className="App">{isLoaded ? renderRoutes() : <Loader />}</div>;
};
export default App;
