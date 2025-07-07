import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonModal from './PokemonModal';

jest.mock('@/utils', () => ({
  fetchPokemonByName: jest.fn(() =>
    Promise.resolve({
      id: 6,
      name: 'charizard',
      sprites: { front_default: 'charizard.png', front_shiny: 'charizard-shiny.png', },
      types: [{ type: { name: 'fire' } }],
      height: 17,
      weight: 905,
      abilities: [{ ability: { name: 'blaze' } }],
      stats: [
        { stat: { name: 'hp' }, base_stat: 78 },
        { stat: { name: 'attack' }, base_stat: 84 },
      ],
    })
  ),
  getPokemonSpriteUrl: jest.fn(() => 'charizard.png'),
}));

jest.mock('@/utilities', () => ({
  sentenceCaseConversion: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
}));

jest.mock('@/constants', () => ({
  PokemonTypesColors: { fire: 'bg-orange-300 text-orange-900' },
  PokemonStatNames: { hp: 'HP', attack: 'ATK' },
}));

const { fetchPokemonByName } = require('@/utils');

describe('PokemonModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { asFragment } = render(<PokemonModal name="charizard" open={true} onClose={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/abilities/i)).toBeInTheDocument();
      expect(screen.getByText(/height/i)).toBeInTheDocument();
      expect(screen.getByText(/weight/i)).toBeInTheDocument();
      expect(screen.getByText(/base stats/i)).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('shows loading and fetches data on open', async () => {
    render(
      <PokemonModal name="charizard" open={true} onClose={jest.fn()} />
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Charizard/)).toBeInTheDocument());
    expect(fetchPokemonByName).toHaveBeenCalledWith('charizard');
  });

  it('shows error if fetch fails', async () => {
    fetchPokemonByName.mockRejectedValueOnce(new Error('Failed!'));
    render(
      <PokemonModal name="charizard" open={true} onClose={jest.fn()} />
    );
    await waitFor(() =>
      expect(screen.getByText(/Failed to load Pokemon Details/i)).toBeInTheDocument()
    );
  });

  it('renders Charizard details when loaded', async () => {
    render(
      <PokemonModal name="charizard" open={true} onClose={jest.fn()} />
    );

    expect(await screen.findByText(/Charizard/)).toBeInTheDocument();
    expect(screen.getByText(/fire/i)).toBeInTheDocument();
    expect(screen.getByText(/blaze/i)).toBeInTheDocument();
    expect(screen.getByText(/78/)).toBeInTheDocument(); // HP
    expect(screen.getByText(/84/)).toBeInTheDocument(); // Attack
  });

  it('toggles shiny and normal sprite', async () => {
    render(
      <PokemonModal name="charizard" open={true} onClose={jest.fn()} />
    );

    expect(await screen.findByAltText(/charizard sprite/i)).toHaveAttribute('src', 'charizard.png');
    const toggle = screen.getByRole('button', { name: /show shiny/i });
    fireEvent.click(toggle);

    expect(screen.getByRole('button', { name: /show normal/i })).toBeInTheDocument();
    expect(screen.getByAltText(/charizard sprite/i)).toHaveAttribute('src', 'charizard-shiny.png');
  });

  it('calls onClose when Close button is clicked', async () => {
    const handleClose = jest.fn();
    render(
      <PokemonModal name="charizard" open={true} onClose={handleClose} />
    );

    await screen.findByText(/Charizard/);
    const closeBtn = screen.getAllByRole('button', { name: /close/i });
    fireEvent.click(closeBtn[0]);
    expect(handleClose).toHaveBeenCalled();
  });
});
