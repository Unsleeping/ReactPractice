import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import * as actions from './actions';
import reducer from './reducer';
import Counter from './components/Counter';

const store = createStore(reducer);
const { dispatch, getState, subscribe } = store;

// const bindActionCreator = (creator, dispatch) => (...args) => dispatch(creator(...args));

const { inc, dec, rnd } = bindActionCreators(actions, dispatch);


const update = () => {
  ReactDOM.render(
    <Counter 
      counter={getState()}
      inc={inc}
      dec={dec}
      rnd={() => {
        const value = Math.floor(Math.random() * 10 + 1);
        rnd(value); 
      }}
    />, 
    document.getElementById('root')
  );
};

update();

subscribe(update);