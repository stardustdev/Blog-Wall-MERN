import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { Collapse } from 'reactstrap';

import Card from 'components/Card';
import { categories } from 'config/constants';

import style from './style.module.scss';

const Tags = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <div>
      <Card className={style.container}>
        <div className={style.title}>
          <span>Trending Tags</span>
        </div>
        {categories.slice(0, 5).map((category) => (
          <div key={category.id} className={style.category}>
            <span>{category.name}</span>
            <FaEllipsisV className={style.iconMore} />
          </div>
        ))}
        <Collapse isOpen={!isCollapsed}>
          {categories.slice(5, categories.length).map((category) => (
            <div key={category.id} className={style.category}>
              <span>{category.name}</span> <FaEllipsisV className={style.iconMore} />
            </div>
          ))}
        </Collapse>
        <div className={style.footer}>
          <span onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? 'SEE MORE' : 'LESS'}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Tags;
