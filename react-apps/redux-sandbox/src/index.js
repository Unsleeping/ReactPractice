import { createStore, bindActionCreators } from 'redux';
import { inc, dec, rnd } from './actions';
import reducer from './reducer';

const store = createStore(reducer);
const { dispatch, getState, subscribe } = store;

// const bindActionCreator = (creator, dispatch) => (...args) => dispatch(creator(...args));

const { incDispatch, decDispatch, rndDispatch } = bindActionCreators({
  incDispatch: inc,
  decDispatch: dec,
  rndDispatch: rnd
}, dispatch);

document
  .getElementById('inc')
  .addEventListener('click', incDispatch);

document
  .getElementById('dec')
  .addEventListener('click', decDispatch);

document
  .getElementById('rnd')
  .addEventListener('click', () => {
    const payload = Math.floor(Math.random() * 10 + 1);
    rndDispatch(payload);
  });

const update = () => {
  document
    .getElementById('counter')
    .innerHTML = getState();
};

subscribe(update);