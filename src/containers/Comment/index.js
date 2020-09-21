import React from 'react';
import ReadMoreAndLess from 'react-read-more-less';

import Card from 'components/Card';
import defaultAvatar from 'resources/images/avatar.png';
import * as timeago from 'timeago.js';

import style from './style.module.scss';

const Comment = ({ comment }) => {
  const { commented_by, content, createdAt } = comment;
  const { firstname, lastname } = commented_by || {};

  return (
    <Card className={style.container}>
      <div className={style.header}>
        <div className={style.headerLeft}>
          <img src={defaultAvatar} className={style.avatar} alt="avatar" />
          <span className={style.name}>{`${firstname} ${lastname}`}</span>
          <span className={style.time}>{timeago.format(createdAt)}</span>
        </div>
      </div>

      <div className={style.content}>
        <ReadMoreAndLess charLimit={70} readMoreText="Read more" readLessText="Read less">
          {content}
        </ReadMoreAndLess>
      </div>
    </Card>
  );
};

export default Comment;
