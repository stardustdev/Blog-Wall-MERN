const toastActions = {
  ADD_TOAST: 'ADD_TOAST',

  addToast: (payload) => ({ type: toastActions.ADD_TOAST, payload }),
};

export default toastActions;
