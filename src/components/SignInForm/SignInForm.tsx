import { Button, Checkbox, Form, Input } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../../features/userSlice';
import { auth } from '../../firebaseConfig';
import { useAppDispatch } from '../../hooks/redux';
import styles from './SignInForm.module.scss';

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: 'Field is required!',
  types: {
    email: '${label} is not a valid email!'
  },
  pattern: {
    mismatch:
      '${label}: 8 chars min, upper, lower letter, digit and symbol: @$!%*#?&_'
  }
};
/* eslint-enable no-template-curly-in-string */

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
        localStorage.setItem(
          'user',
          JSON.stringify({
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
      <div className={`${styles.FormTitle}`}>LOGIN</div>
      <Form
        name='signIn'
        layout='vertical'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='on'
        validateMessages={validateMessages}
      >
        <Form.Item
          className={styles.FormItem}
          label='User email'
          name='email'
          rules={[{ required: true, type: 'email' }]}
        >
          <Input className={styles.SignInInput} />
        </Form.Item>

        <Form.Item
          className={styles.FormItem}
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/
            }
          ]}
        >
          <Input.Password className={styles.SignInInput} />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          className={styles.FormItem}
        >
          <Checkbox className={styles.Checkbox}>Remember me</Checkbox>
        </Form.Item>

        <div className={styles.SubmitSection}>
          <Form.Item className={styles.FormLoginItem}>
            <Button
              className={styles.LoginBtn}
              type='primary'
              htmlType='submit'
            >
              LOGIN
            </Button>
          </Form.Item>
          <div className={styles.SignUpLink}>
            Need an account? <Link to='/register'>SIGN UP</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
