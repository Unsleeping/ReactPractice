import { createStore, bindActionCreators } from 'redux';
import * as actions from './actions';
import reducer from './reducer';

const store = createStore(reducer);
const { dispatch, getState, subscribe } = store;

// const bindActionCreator = (creator, dispatch) => (...args) => dispatch(creator(...args));

const { inc, dec, rnd } = bindActionCreators(actions, dispatch);

document
  .getElementById('inc')
  .addEventListener('click', inc);

document
  .getElementById('dec')
  .addEventListener('click', dec);

document
  .getElementById('rnd')
  .addEventListener('click', () => {
    const payload = Math.floor(Math.random() * 10 + 1);
    rnd(payload);
  });

const update = () => {
  document
    .getElementById('counter')
    .innerHTML = getState();
};

subscribe(update);