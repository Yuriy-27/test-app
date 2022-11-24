import { Button, Form, Input } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './SignInForm.module.scss';

const SignInForm: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
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
        autoComplete='off'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
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
