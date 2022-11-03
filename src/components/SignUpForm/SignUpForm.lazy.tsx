import React, { Suspense, lazy } from 'react';

const LazySignUpForm = lazy(() => import('./SignUpForm'));

const SignUpForm = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazySignUpForm {...props} />
  </Suspense>
);

export default SignUpForm;
