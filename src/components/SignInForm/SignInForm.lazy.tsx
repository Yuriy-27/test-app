import React, { Suspense, lazy } from 'react';

const LazySignInForm = lazy(() => import('./SignInForm'));

const SignInForm = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazySignInForm {...props} />
  </Suspense>
);

export default SignInForm;
