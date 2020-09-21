const articleActions = {
  GET_ALL_ARTICLES_REQUEST: 'GET_ALL_ARTICLES_REQUEST',
  GET_ALL_ARTICLES_SUCCESS: 'GET_ALL_ARTICLES_SUCCESS',
  GET_ALL_ARTICLES_FAILED: 'GET_ALL_ARTICLES_FAILED',

  GET_POPULAR_ARTICLES_REQUEST: 'GET_POPULAR_ARTICLES_REQUEST',
  GET_POPULAR_ARTICLES_SUCCESS: 'GET_POPULAR_ARTICLES_SUCCESS',
  GET_POPULAR_ARTICLES_FAILED: 'GET_POPULAR_ARTICLES_FAILED',

  ADD_ARTICLE_REQUEST: 'ADD_ARTICLE_REQUEST',
  ADD_ARTICLE_SUCCESS: 'ADD_ARTICLE_SUCCESS',
  ADD_ARTICLE_FAILED: 'ADD_ARTICLE_FAILED',

  DELETE_ARTICLE_REQUEST: 'DELETE_ARTICLE_REQUEST',
  DELETE_ARTICLE_SUCCESS: 'DELETE_ARTICLE_SUCCESS',
  DELETE_ARTICLE_FAILED: 'DELETE_ARTICLE_FAILED',

  EDIT_ARTICLE_REQUEST: 'EDIT_ARTICLE_REQUEST',
  EDIT_ARTICLE_SUCCESS: 'EDIT_ARTICLE_SUCCESS',
  EDIT_ARTICLE_FAILED: 'EDIT_ARTICLE_FAILED',

  ADD_COMMENT_REQUEST: 'ADD_COMMENT_REQUEST',
  ADD_COMMENT_SUCCESS: 'ADD_COMMENT_SUCCESS',
  ADD_COMMENT_FAILED: 'ADD_COMMENT_FAILED',

  LIKE_ARTICLE_REQUEST: 'LIKE_ARTICLE_REQUEST',
  LIKE_ARTICLE_SUCCESS: 'LIKE_ARTICLE_SUCCESS',
  LIKE_ARTICLE_FAILED: 'LIKE_ARTICLE_FAILED',

  FAVORITE_ARTICLE_REQUEST: 'FAVORITE_ARTICLE_REQUEST',
  FAVORITE_ARTICLE_SUCCESS: 'FAVORITE_ARTICLE_SUCCESS',
  FAVORITE_ARTICLE_FAILED: 'FAVORITE_ARTICLE_FAILED',

  getAllArticlesRequest: (payload) => ({ type: articleActions.GET_ALL_ARTICLES_REQUEST, payload }),
  getAllArticlesSuccess: (payload) => ({ type: articleActions.GET_ALL_ARTICLES_SUCCESS, payload }),
  getAllArticlesError: (payload) => ({ type: articleActions.GET_ALL_ARTICLES_FAILED, payload }),

  getPopularArticlesRequest: (payload) => ({
    type: articleActions.GET_POPULAR_ARTICLES_REQUEST,
    payload,
  }),
  getPopularArticlesSuccess: (payload) => ({
    type: articleActions.GET_POPULAR_ARTICLES_SUCCESS,
    payload,
  }),
  getPopularArticlesError: (payload) => ({
    type: articleActions.GET_POPULAR_ARTICLES_FAILED,
    payload,
  }),

  addArticleRequest: (payload) => ({ type: articleActions.ADD_ARTICLE_REQUEST, payload }),
  addArticleSuccess: (payload) => ({ type: articleActions.ADD_ARTICLE_SUCCESS, payload }),
  addArticleFailed: (payload) => ({ type: articleActions.ADD_ARTICLE_FAILED, payload }),

  deleteArticleRequest: (payload) => ({ type: articleActions.DELETE_ARTICLE_REQUEST, payload }),
  deleteArticleSuccess: (payload) => ({ type: articleActions.DELETE_ARTICLE_SUCCESS, payload }),
  deleteArticleFailed: (payload) => ({ type: articleActions.DELETE_ARTICLE_FAILED, payload }),

  editArticleRequest: (id, payload) => ({ type: articleActions.EDIT_ARTICLE_REQUEST, id, payload }),
  editArticleSuccess: (payload) => ({ type: articleActions.EDIT_ARTICLE_SUCCESS, payload }),
  editArticleFailed: (payload) => ({ type: articleActions.EDIT_ARTICLE_FAILED, payload }),

  addCommentRequest: (id, payload) => ({ type: articleActions.ADD_COMMENT_REQUEST, id, payload }),
  addCommentSuccess: (payload) => ({ type: articleActions.ADD_COMMENT_SUCCESS, payload }),
  addCommentFailed: (payload) => ({ type: articleActions.ADD_COMMENT_FAILED, payload }),

  likeArticleRequest: (payload) => ({ type: articleActions.LIKE_ARTICLE_REQUEST, payload }),
  likeArticleSuccess: (payload) => ({ type: articleActions.LIKE_ARTICLE_SUCCESS, payload }),
  likeArticleFailed: (payload) => ({ type: articleActions.LIKE_ARTICLE_FAILED, payload }),

  favoriteArticleRequest: (payload) => ({ type: articleActions.FAVORITE_ARTICLE_REQUEST, payload }),
  favoriteArticleSuccess: (payload) => ({ type: articleActions.FAVORITE_ARTICLE_SUCCESS, payload }),
  favoriteArticleFailed: (payload) => ({ type: articleActions.FAVORITE_ARTICLE_FAILED, payload }),
};

export default articleActions;
