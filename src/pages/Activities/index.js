import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cx from 'classnames';
import Article from 'containers/Article';
import authActions from 'redux/auth/actions';
import COMING_SOON_IMG from 'resources/images/coming-soon.png';

import style from '../Home/style.module.scss';

const ARTICLES = 0;
const COMMENTS = 1;

const Activities = () => {
  const [tab, setTab] = useState(ARTICLES);
  const dispatch = useDispatch();
  const myArticles = useSelector((state) => state.Auth?.user?.articles || []);

  useEffect(() => {
    dispatch(authActions.getUserArticlesRequest());
  }, [dispatch]);

  const renderContent = () => {
    if (tab === ARTICLES) {
      return myArticles?.length ? (
        myArticles.map((article) => <Article key={article._id} article={article} showInput />)
      ) : (
        <h6 className={style.noArticle}>You have not posted an article yet</h6>
      );
    } else {
      return (
        <div className={style.comingSoon}>
          <img alt="coming" width={300} src={COMING_SOON_IMG} />
          <div>
            <h2>Under construction</h2>
            <p>
              We are working on this section.
              <br /> Thank you for you patience
            </p>
            <p>/ Wall app team</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={style.container}>
      <h3>
        <span className={cx({ [style.active]: tab === ARTICLES })} onClick={() => setTab(ARTICLES)}>
          My posts
        </span>
        <span className={cx({ [style.active]: tab === COMMENTS })} onClick={() => setTab(COMMENTS)}>
          My comments
        </span>
      </h3>
      <hr />
      {renderContent()}
    </div>
  );
};

export default Activities;
