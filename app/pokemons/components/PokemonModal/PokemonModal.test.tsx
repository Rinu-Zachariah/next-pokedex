import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonModal from './PokemonModal';

jest.mock('@/utils', () => ({
  fetchPokemonByName: jest.fn(() =>
    Promise.resolve({
      id: 6,
      name: 'charizard',
      sprites: { front_default: 'charizard.png' },
      types: [{ type: { name: 'fire' } }],
      height: 17,
      weight: 905,
      abilities: [{ ability: { name: 'blaze' } }],
    })
  ),
  getPokemonSpriteUrl: jest.fn(() => 'charizard.png'),
}));

describe('PokemonModal', () => {
  it('renders correctly', async () => {
    const { asFragment } = render(<PokemonModal name="charizard" open={true} onClose={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/abilities:/i)).toBeInTheDocument();
      expect(screen.getByText(/height:/i)).toBeInTheDocument();
      expect(screen.getByText(/weight:/i)).toBeInTheDocument();
      expect(screen.getByText(/type:/i)).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
