import { Button, Form, Input } from 'antd';
import React, { FC } from 'react';

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

const SignUpForm: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
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
          label='User name'
          name='name'
          rules={[{ required: true, whitespace: true, min: 2 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='User surname'
          name='surname'
          rules={[{ required: true, whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='User email'
          name='email'
          rules={[{ required: true, type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
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
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
