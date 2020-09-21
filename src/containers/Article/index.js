import React, { useState, useEffect } from 'react';
import { AiOutlineLike, AiOutlineHeart } from 'react-icons/ai';
import { FaEllipsisV, FaRegComments } from 'react-icons/fa';
import ReadMoreAndLess from 'react-read-more-less';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse } from 'reactstrap';

import cx from 'classnames';
import Button from 'components/Button';
import Card from 'components/Card';
import Dropdown from 'components/Dropdown';
import Comment from 'containers/Comment';
import articleActions from 'redux/article/actions';
import defaultAvatar from 'resources/images/avatar.png';
import * as timeago from 'timeago.js';

import style from './style.module.scss';

const actions = [
  { id: 1, name: 'Edit' },
  { id: 2, name: 'Delete' },
];

const Article = ({ article, showInput }) => {
  const [showComments, setShowComments] = useState(false);
  const [editArticle, setEditArticle] = useState(false);
  const [content, setContent] = useState(article.content);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);

  const {
    posted_by: { email, firstname, lastname },
    content: articleContent,
    tag,
    likes,
    createdAt,
    comments,
    isLiked,
  } = article;
  const isFavorited =
    user &&
    user.favorites &&
    user.favorites.map(({ _id }) => _id).includes(article._id);

  useEffect(() => {
    if (content === articleContent) {
      setEditArticle(false);
    }
  }, [content, articleContent]);

  const handleSelect = (action) => {
    if (action.name === 'Edit') {
      setEditArticle(true);
    } else if (action.name === 'Delete') {
      dispatch(articleActions.deleteArticleRequest(article._id));
    }
  };

  const handleUpdate = () => {
    dispatch(
      articleActions.editArticleRequest(article._id, {
        content,
        tag: article.tag,
      })
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(
        articleActions.addCommentRequest(article._id, { content: comment })
      );
      setComment('');
      setShowComments(true);
    }
  };

  const handleAction = () => {
    dispatch(
      articleActions.likeArticleRequest({ id: article._id, liked: !isLiked })
    );
  };

  const handleFavoriteAction = () => {
    dispatch(
      articleActions.favoriteArticleRequest({
        id: article._id,
        isFavorited: !isFavorited,
      })
    );
  };

  return (
    <div className={style.container}>
      <Card>
        <div className={style.header}>
          <div className={style.headerLeft}>
            <img src={defaultAvatar} className={style.avatar} alt="avatar" />
            <span className={style.name}>{`${firstname} ${lastname}`}</span>
            <span className={style.time}>{timeago.format(createdAt)}</span>
          </div>
          <div className={style.headerRight}>
            <AiOutlineHeart
              className={cx(style.icon, {
                [style.active]: isFavorited,
              })}
              onClick={handleFavoriteAction}
            />
            {user?.email === email && (
              <Dropdown options={actions} onSelect={handleSelect}>
                <FaEllipsisV className={style.iconMore} />
              </Dropdown>
            )}
          </div>
        </div>
        <div className={style.content}>
          {editArticle ? (
            <div>
              <textarea
                cols={4}
                placeholder="What do you want to talk about"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className={style.contentEditAction}>
                <Button
                  outline
                  color="danger"
                  size="sm"
                  onClick={() => setEditArticle(false)}
                >
                  Cancel
                </Button>
                <Button
                  outline
                  color="primary"
                  size="sm"
                  onClick={handleUpdate}
                  disabled={content === articleContent}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <ReadMoreAndLess
                charLimit={210}
                readMoreText="Read more"
                readLessText="Read less"
              >
                {articleContent}
              </ReadMoreAndLess>

              <span className={style.tag}>{tag}</span>
            </React.Fragment>
          )}
        </div>
        <div className={style.footer}>
          <div className={style.row}>
            <div className={style.actions}>
              <div className={style.likes}>
                <AiOutlineLike
                  className={cx(style.icon, {
                    [style.active]: isLiked,
                  })}
                  onClick={handleAction}
                />
                <span>{`${likes || 0} Likes`}</span>
              </div>
              <div className={style.favorites}>
                <FaRegComments className={style.icon} />
                <span>{`${comments.length || 0} Comments`}</span>
              </div>
            </div>
            <div
              className={style.btnComment}
              onClick={() => setShowComments(!showComments)}
            >
              {!!comments.length && (
                <span>{showComments ? 'hide' : 'show'} comments</span>
              )}
            </div>
          </div>
          {showInput && (
            <div className={style.row}>
              <img
                src={defaultAvatar}
                className={style.avatar}
                alt="user-avatar"
              />
              <input
                className={style.input}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          )}
        </div>
      </Card>
      <Collapse isOpen={showComments}>
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </Collapse>
    </div>
  );
};

export default Article;
