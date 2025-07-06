import React from 'react';
import { render } from '@testing-library/react';
import FilterInput from './FilterInput';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => ({
    get: jest.fn(),
    set: jest.fn(),
  }),
}));

describe('FilterInput', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<FilterInput searchText="charizard" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
