const authActions = {
  SIGNIN_REQUEST: 'SIGNIN_REQUEST',
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  SIGNIN_FAILED: 'SIGNIN_FAILED',

  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILED: 'SIGNUP_FAILED',

  SIGNOUT_REQUEST: 'SIGNOUT_REQUEST',
  SIGNOUT_SUCCESS: 'SIGNOUT_SUCCESS',
  SIGNOUT_FAILED: 'SIGNOUT_FAILED',

  GET_USER_ARTICLES_REQUEST: 'GET_USER_ARTICLES_REQUEST',
  GET_USER_ARTICLES_SUCCESS: 'GET_USER_ARTICLES_SUCCESS',
  GET_USER_ARTICLES_FAILED: 'GET_USER_ARTICLES_FAILED',

  GET_FAVORITE_ARTICLES_REQUEST: 'GET_FAVORITE_ARTICLES_REQUEST',
  GET_FAVORITE_ARTICLES_SUCCESS: 'GET_FAVORITE_ARTICLES_SUCCESS',
  GET_FAVORITE_ARTICLES_FAILED: 'GET_FAVORITE_ARTICLES_FAILED',

  signinRequest: (payload) => ({ type: authActions.SIGNIN_REQUEST, payload }),
  signinSuccess: (payload) => ({ type: authActions.SIGNIN_SUCCESS, payload }),
  signinFailed: (payload) => ({ type: authActions.SIGNIN_FAILED, payload }),

  signupRequest: (payload) => ({ type: authActions.SIGNUP_REQUEST, payload }),
  signupSuccess: (payload) => ({ type: authActions.SIGNUP_SUCCESS, payload }),
  signupFailed: (payload) => ({ type: authActions.SIGNUP_FAILED, payload }),

  signoutRequest: () => ({ type: authActions.SIGNOUT_REQUEST }),
  signoutSuccess: () => ({ type: authActions.SIGNOUT_SUCCESS }),
  signoutFailed: (payload) => ({ type: authActions.SIGNOUT_FAILED, payload }),

  getUserArticlesRequest: () => ({ type: authActions.GET_USER_ARTICLES_REQUEST }),
  getUserArticlesSuccess: (payload) => ({ type: authActions.GET_USER_ARTICLES_SUCCESS, payload }),
  getUserArticlesFailed: (payload) => ({ type: authActions.GET_USER_ARTICLES_FAILED, payload }),

  getFavoriteArticlesRequest: () => ({ type: authActions.GET_FAVORITE_ARTICLES_REQUEST }),
  getFavoriteArticlesSuccess: (payload) => ({
    type: authActions.GET_FAVORITE_ARTICLES_SUCCESS,
    payload,
  }),
  getFavoriteArticlesFailed: (payload) => ({
    type: authActions.GET_FAVORITE_ARTICLES_FAILED,
    payload,
  }),
};

export default authActions;
