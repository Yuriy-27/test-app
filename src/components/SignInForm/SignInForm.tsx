import { Button, Form, Input } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../../features/userSlice';
import { auth } from '../../firebaseConfig';
import { useAppDispatch } from '../../hooks/redux';
import styles from './SignInForm.module.scss';

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (values: SignInFormValues) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userAuth) => {
        // console.log(userAuth);
        // Dispatch the user information for persistence in the redux state
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName
          })
        );
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={`${styles.SignInForm}`} data-testid='SignInForm'>
      <div className={`${styles.FormTitle}`}>Sign In</div>
      <Form
        name='signIn'
        layout='vertical'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='on'
      >
        <Form.Item
          label='User email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <div className={styles.SubmitSection}>
          <Form.Item className={styles.FormItem}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
          <div className='sign-up__link'>
            Need an account? <Link to='/register'>Sign Up</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
