import articleActions from 'redux/article/actions';

import actions from './actions';

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      };
    case actions.SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      };
    case actions.SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.SIGNOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.SIGNOUT_SUCCESS:
      return {
        user: null,
        loading: false,
        error: null,
      };
    case actions.SIGNOUT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.GET_USER_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_USER_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          articles: payload,
        },
      };
    case actions.GET_USER_ARTICLES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.GET_FAVORITE_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_FAVORITE_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          favorites: payload,
        },
      };
    case actions.GET_FAVORITE_ARTICLES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case articleActions.LIKE_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case articleActions.LIKE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          favorites: state.user.favorites.map((article) => {
            if (article._id !== payload.id) return article;
            return {
              ...article,
              likes: payload.liked ? article.likes + 1 : article.likes - 1,
              isLiked: !article.isLiked,
            };
          }),
        },
      };
    case articleActions.LIKE_ARTICLE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
