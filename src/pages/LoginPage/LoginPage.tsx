import React, { FC } from 'react';

import SignInForm from '../../components/SignInForm/SignInForm.lazy';
import styles from './LoginPage.module.scss';

const LoginPage: FC = () => (
  <div className={styles.LoginPage} data-testid='LoginPage'>
    <SignInForm />
  </div>
);

export default LoginPage;
