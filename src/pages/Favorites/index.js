import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Article from 'containers/Article';
import authActions from 'redux/auth/actions';

import style from '../Home/style.module.scss';

const Favorites = () => {
  const dispatch = useDispatch();
  const favoriteArticles = useSelector((state) => state.Auth?.user?.favorites || []);
  useEffect(() => {
    dispatch(authActions.getFavoriteArticlesRequest());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <h3>Favorites</h3>
      <hr />
      {favoriteArticles?.length ? (
        favoriteArticles.map((article) => <Article key={article._id} article={article} showInput />)
      ) : (
        <h6 className={style.noArticle}>You have no favorite article yet</h6>
      )}
    </div>
  );
};

export default Favorites;
