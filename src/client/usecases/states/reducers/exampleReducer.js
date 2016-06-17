import {
  EXAMPLE_INCREMENT,
  EXAMPLE_DECREMENT,
} from '../actions/exampleAction';

const initialState = 0;

const exampleReducer = (state = initialState, action) => {
  if (action.type === EXAMPLE_INCREMENT) {
    return state + 1;
  }

  if (action.type === EXAMPLE_DECREMENT) {
    return state - 1;
  }

  return state;
};

export default exampleReducer;
