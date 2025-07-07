import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonTable from './PokemonTable';
import { IPokemonRow } from '@/typings';


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

const mockList: IPokemonRow[] = [
  {
    id: 25,
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  },
  {
    id: 1,
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    id: 21,
    name: "spearow",
    url: "https://pokeapi.co/api/v2/pokemon/21/"
  },
  {
    id: 22,
    name: "fearow",
    url: "https://pokeapi.co/api/v2/pokemon/22/"
  },
];

describe('PokemonTable', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <PokemonTable
        pokemonList={mockList}
        count={66}
        page={1}
        pageSize={7}
        filterName="spearow"
        error="some error"
      />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table headers', () => {
    render(
      <PokemonTable
        pokemonList={mockList}
        count={2}
        page={1}
        pageSize={20}
        filterName=""
        error=""
      />
    );
    expect(screen.getByText(/Image/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
  });

  it('renders Pokémon names', () => {
    render(
      <PokemonTable
        pokemonList={mockList}
        count={2}
        page={1}
        pageSize={20}
        filterName=""
        error=""
      />
    );
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/Spearow/i)).toBeInTheDocument();
    expect(screen.getByText(/Fearow/i)).toBeInTheDocument();
  });

  it('shows empty state if no Pokémon', () => {
    render(
      <PokemonTable
        pokemonList={[]}
        count={0}
        page={1}
        pageSize={20}
        filterName="pakichu"
        error=""
      />
    );
    expect(screen.getByText(/No Pokemon found!!/i)).toBeInTheDocument();
  });
});
