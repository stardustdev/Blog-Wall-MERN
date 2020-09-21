import React, { useState, useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaRegComments, FaBars } from 'react-icons/fa';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { MdFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Modal } from 'reactstrap';

import Login from 'containers/Login';
import Register from 'containers/Register';

import MenuItem from './components/MenuItem';
import style from './style.module.scss';

const menuItems = [
  { id: 1, name: 'Home', to: '/home', icon: <AiOutlineHome size={25} />, auth: false },
  { id: 2, name: 'Popular', to: '/popular', icon: <FaRegComments size={25} />, auth: false },
  { id: 3, name: 'Favorites', to: '/favorites', icon: <MdFavoriteBorder size={25} />, auth: true },
  { id: 4, name: 'My Activity', to: '/activity', icon: <FaBars size={25} />, auth: true },
];

const SideMenu = ({
  history: {
    location: { pathname },
  },
  loggedIn,
  onLogout,
}) => {
  const [, setMenu] = useState(pathname);
  const [modal, setModal] = useState('');

  useEffect(() => {
    setModal('');
  }, [loggedIn]);

  const getMenuItems = () => {
    if (loggedIn) return menuItems;
    return menuItems.filter((item) => !item.auth);
  };

  return (
    <div className={style.container}>
      <h3>Wall App</h3>
      <div className={style.menuItems}>
        {getMenuItems().map((menuItem) => (
          <Link key={menuItem.id} to={menuItem.to} onClick={() => setMenu(menuItem.to)}>
            <MenuItem item={menuItem} isActive={menuItem.to === pathname} />
          </Link>
        ))}
      </div>

      {loggedIn ? (
        <div onClick={onLogout}>
          <MenuItem item={{ name: 'Log out', icon: <FiLogOut style={{ fontSize: 25 }} /> }} />
        </div>
      ) : (
        <React.Fragment>
          <div onClick={() => setModal('Login')}>
            <MenuItem item={{ name: 'Sign In', icon: <FiLogIn style={{ fontSize: 25 }} /> }} />
          </div>
          <div onClick={() => setModal('Register')}>
            <MenuItem
              item={{ name: 'Sign Up', icon: <AiOutlineUserAdd style={{ fontSize: 25 }} /> }}
            />
          </div>
        </React.Fragment>
      )}

      <Modal isOpen={!!modal} toggle={() => setModal('')}>
        {modal === 'Login' && <Login onClickRegister={() => setModal('Register')} />}
        {modal === 'Register' && <Register onClickLogin={() => setModal('Login')} />}
      </Modal>
    </div>
  );
};

export default SideMenu;
