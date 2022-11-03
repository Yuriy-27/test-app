import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import SignUpForm from './SignUpForm';

describe('<SignUpForm />', () => {
  test('it should mount', () => {
    render(<SignUpForm />);

    const signUpForm = screen.getByTestId('SignUpForm');

    expect(signUpForm).toBeInTheDocument();
  });
});
