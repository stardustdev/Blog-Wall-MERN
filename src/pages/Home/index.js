import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddArticle from 'containers/AddArticle';
import Article from 'containers/Article';
import articleActions from 'redux/article/actions';
import authActions from 'redux/auth/actions';

import style from './style.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.Article);

  useEffect(() => {
    dispatch(articleActions.getAllArticlesRequest());
    dispatch(authActions.getFavoriteArticlesRequest());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <h3>Home</h3>
      <hr />
      <AddArticle />
      <hr />
      {articles?.length ? (
        articles.map((article) => <Article key={article._id} article={article} showInput />)
      ) : (
        <h6 className={style.noArticle}>There are no articles yet</h6>
      )}
    </div>
  );
};

export default Home;
