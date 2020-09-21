import actions from './actions';

const initialState = {
  loading: false,
  articles: [],
  popularArticles: [],
  error: null,
};

export default function articleReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.GET_ALL_ARTICLES_REQUEST:
    case actions.GET_POPULAR_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_ALL_ARTICLES_SUCCESS:
    case actions.GET_POPULAR_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: payload,
        error: null,
      };
    case actions.GET_ALL_ARTICLES_FAILED:
    case actions.GET_POPULAR_ARTICLES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.ADD_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: [payload, ...state.articles],
      };
    case actions.ADD_ARTICLE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.DELETE_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: state.articles.filter((article) => article._id !== payload),
      };
    case actions.DELETE_ARTICLE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.EDIT_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.EDIT_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: state.articles.map((article) => {
          if (article._id !== payload.id) return article;
          return {
            ...article,
            ...payload,
          };
        }),
      };
    case actions.EDIT_ARTICLE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.ADD_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        articles: state.articles.map((article) => {
          if (article._id !== payload.articleId) return article;
          return {
            ...article,
            comments: [payload.comment, ...article.comments],
          };
        }),
      };
    case actions.LIKE_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.LIKE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: state.articles.map((article) => {
          if (article._id !== payload.id) return article;
          return {
            ...article,
            likes: payload.liked ? article.likes + 1 : article.likes - 1,
            isLiked: !article.isLiked,
          };
        }),
      };
    case actions.LIKE_ARTICLE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
