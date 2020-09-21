import actions from './action';

const initialState = {
  toast: null,
};

export default function toastReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_TOAST:
      return {
        ...state,
        toast: payload,
      };
    default:
      return state;
  }
}
