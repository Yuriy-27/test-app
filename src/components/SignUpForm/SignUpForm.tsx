import { Button, Form, Input } from 'antd';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../../features/userSlice';
import { auth } from '../../firebaseConfig';
import { useAppDispatch } from '../../hooks/redux';
import styles from './SignUpForm.module.scss';

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: 'Field is required!',
  types: {
    email: '${label} is not a valid email!'
  },
  name: {
    range: '${label} must be at least ${min} characters'
  },
  pattern: {
    mismatch:
      '${label}: 8 chars min, upper, lower letter, digit and symbol: @$!%*#?&_'
  }
};
/* eslint-enable no-template-curly-in-string */

interface SignUpFormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (values: SignUpFormValues) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userAuth) => {
        // console.log(userAuth);
        // Update the newly created user with a display name and a picture
        updateProfile(userAuth.user, {
          displayName: `${values.name} ${values.surname}`
        });
        // Dispatch the user information for persistence in the redux state
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: `${values.name} ${values.surname}`
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
    <div className={`${styles.SignUpForm}`} data-testid='SignUpForm'>
      <div className={`${styles.FormTitle}`}>Sign Up</div>
      <Form
        name='signUp'
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        validateMessages={validateMessages}
      >
        <Form.Item
          className={styles.FormItem}
          label='User name'
          name='name'
          rules={[{ required: true, whitespace: true, min: 2 }]}
        >
          <Input className={styles.SignUpInput} />
        </Form.Item>

        <Form.Item
          className={styles.FormItem}
          label='User surname'
          name='surname'
          rules={[{ required: true, whitespace: true }]}
        >
          <Input className={styles.SignUpInput} />
        </Form.Item>

        <Form.Item
          className={styles.FormItem}
          label='User email'
          name='email'
          rules={[{ required: true, type: 'email' }]}
        >
          <Input className={styles.SignUpInput} />
        </Form.Item>

        <Form.Item
          className={styles.FormItem}
          label='User password'
          name='password'
          rules={[
            {
              required: true,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/
            }
          ]}
        >
          <Input.Password className={styles.SignUpInput} />
        </Form.Item>

        <div className={styles.SubmitSection}>
          <Form.Item className={styles.FormRegisterItem}>
            <Button
              type='primary'
              htmlType='submit'
              className={styles.SignUpBtn}
            >
              Sign Up
            </Button>
          </Form.Item>
          <div className={styles.SignInLink}>
            Already have an account? <Link to='/login'>Sign In</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
