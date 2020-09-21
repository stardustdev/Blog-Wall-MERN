import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Article from 'containers/Article';
import articleActions from 'redux/article/actions';

import style from '../Home/style.module.scss';

const Popular = () => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.Article || []);

  useEffect(() => {
    dispatch(articleActions.getPopularArticlesRequest());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <h3>Popular articles</h3>
      <hr />
      {articles?.length ? (
        articles.map((article) => <Article key={article._id} article={article} showInput />)
      ) : (
        <h6 className={style.noArticle}>There are no articles yet</h6>
      )}
    </div>
  );
};

export default Popular;
