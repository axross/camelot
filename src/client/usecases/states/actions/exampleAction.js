export const EXAMPLE_INCREMENT = Symbol('EXAMPLE_INCREMENT');
export const EXAMPLE_DECREMENT = Symbol('EXAMPLE_DECREMENT');

const exampleAction = {
  increment: () => ({ type: EXAMPLE_INCREMENT }),
  decrement: () => ({ type: EXAMPLE_DECREMENT }),
};

export default exampleAction;
