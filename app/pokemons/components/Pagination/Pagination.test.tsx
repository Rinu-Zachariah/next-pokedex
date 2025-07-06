import React from 'react';
import { render } from '@testing-library/react';
import Pagination from './Pagination';

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

describe('Pagination', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Pagination total={60} page={2} pageSize={20} filterName="charizard" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
