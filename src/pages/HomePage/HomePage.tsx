import { Button } from 'antd';
import React, { FC } from 'react';

import { logout } from '../../features/userSlice';
import { auth } from '../../firebaseConfig';
import { useAppDispatch } from '../../hooks/redux';
import styles from './HomePage.module.scss';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const logoutOfApp = () => {
    // dispatch to the store with the logout action
    dispatch(logout());
    // sign out function from firebase
    auth.signOut();
    // remove user data from localStorage
    localStorage.removeItem('user');
  };
  return (
    <div className={styles.HomePage} data-testid='HomePage'>
      <h1> HomePage Component</h1>
      <Button type='primary' block onClick={logoutOfApp}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
