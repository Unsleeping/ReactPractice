import React, { useContext, useEffect, lazy, Suspense } from 'react';
import App from '../components/App';
import { Store } from '../Store';
import { IEpisodeProps } from '../types/interfaces';
import { fetchDataAction, toggleFavAction } from '../Actions'

const EpisodesList = lazy<any>(() => import('../components/EpisodesList'));

const HomePage = (): JSX.Element => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction(dispatch)
  });

  const props: IEpisodeProps = {
    episodes: state.episodes,
    store: { state, dispatch },
    toggleFavAction,
    favourites: state.favourites
  };

  return (
    <App>
      <Suspense fallback={<div>loading...</div>}>
        <section className='episode-layout'>
          <EpisodesList {...props} />
        </section>
      </Suspense>
    </App>
  );
};

export default HomePage;