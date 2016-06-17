/* @flow */
type Action = {
  [key: string]: Function;
}

const bindDispatch = (action: Action, dispatch: Function): Action => {
  const binded = {};

  for (const key of Object.keys(action)) {
    binded[key] = (...args) => dispatch(action[key](...args));
  }

  return binded;
};

export default bindDispatch;
