import React from 'react';
import { render } from '@testing-library/react';
import EmptyPokemonList from './EmptyPokemonList';

describe('EmptyPokemonList', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<EmptyPokemonList searchText="charizard" error="some error" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
