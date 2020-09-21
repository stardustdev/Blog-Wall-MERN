import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Button';
import Select from 'components/Select';
import { categories } from 'config/constants';
import articleActions from 'redux/article/actions';

import style from './style.module.scss';

const AddArticle = () => {
  const [content, setContent] = useState('');
  const [tag, setTag] = useState(categories[0].name);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Article);

  useEffect(() => {
    if (!loading) setContent('');
  }, [loading]);

  const handleSubmit = () => {
    if (content && tag) {
      dispatch(
        articleActions.addArticleRequest({
          content,
          tag,
        })
      );
    }
  };

  return (
    <div className={style.container}>
      <textarea
        cols={4}
        placeholder="What do you want to talk about"
        value={content}
        disabled={loading}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className={style.footer}>
        <Select
          options={categories}
          disabled={loading}
          onSelect={(option) => setTag(option.name)}
        />
        <Button
          color="primary"
          outline
          disabled={!content || loading}
          onClick={handleSubmit}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default AddArticle;
