/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Test from './Test';

test('Test component', () => {
  render(<Test />);
  screen.debug();
  expect(screen.getByDisplayValue('tiger')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Change'));
  screen.debug();
  expect(screen.getByDisplayValue('cat')).toBeInTheDocument();
});
