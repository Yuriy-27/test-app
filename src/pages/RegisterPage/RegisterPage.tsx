import React, { FC } from 'react';

import SignUpForm from '../../components/SignUpForm/SignUpForm';
import styles from './RegisterPage.module.scss';

const RegisterPage: FC = () => (
  <div className={styles.RegisterPage} data-testid='RegisterPage'>
    <SignUpForm />
  </div>
);

export default RegisterPage;
