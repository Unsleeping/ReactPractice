import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTokenFromLocalStorage } from './utils/utils';
import checkToken from './services/checkToken';
import { setAuthenticationState } from './redux/ducks/authentication';
import { ROUTE_NAMES } from './constants/routeNames';
import './App.scss';

import ProjectList from './pages/ProjectList';
import Signin from './pages/Authentication/Signin';
import Login from './pages/Authentication/Login';
import PageNotFound from './pages/PageNotFound';
import WelcomePage from './pages/WelcomePage';

import Loader from './components/Loader';

const App = () => {
  const [isLoaded, setLoadedState] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state) => state.authenticationReducer
  );

  useEffect(async () => {
    getTokenFromLocalStorage();
    if (window.token && !isAuthenticated) {
      const result = await checkToken();
      if (result.detail !== 'Invalid token.')
        dispatch(setAuthenticationState(true));
    }
    setLoadedState(true);
  }, []);

  const renderRoutes = () => {
    const { AUTHORISET, root, wrongPage } = ROUTE_NAMES;
    const { projectList } = AUTHORISET;

    if (isAuthenticated) {
      return (
        <>
          <ProjectList path={projectList} component={ProjectList} />
          <PageNotFound path={wrongPage} />
        </>
      );
    }
    return (
      <>
        <WelcomePage path={root} />
        <Login path="/login" />
        <Signin path="/signin" />
        <PageNotFound path={wrongPage} />
      </>
    );
  };
  return <div className="App">{isLoaded ? renderRoutes() : <Loader />}</div>;
};
export default App;
