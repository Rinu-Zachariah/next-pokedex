import React from 'react';
import { render } from '@testing-library/react';
import PokemonTable from './PokemonTable';

describe('PokemonTable', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <PokemonTable
        pokemonList={[
          {
            "name": "spearow",
            "url": "https://pokeapi.co/api/v2/pokemon/21/"
          },
          {
            "name": "fearow",
            "url": "https://pokeapi.co/api/v2/pokemon/22/"
          },
          {
            "name": "ekans",
            "url": "https://pokeapi.co/api/v2/pokemon/23/"
          },
          {
            "name": "arbok",
            "url": "https://pokeapi.co/api/v2/pokemon/24/"
          },
          {
            "name": "pikachu",
            "url": "https://pokeapi.co/api/v2/pokemon/25/"
          },
          {
            "name": "raichu",
            "url": "https://pokeapi.co/api/v2/pokemon/26/"
          },
          {
            "name": "sandshrew",
            "url": "https://pokeapi.co/api/v2/pokemon/27/"
          }
        ]}
        count={66}
        page={1}
        pageSize={7}
        filterName="spearow"
        error="some error"
      />);
    expect(asFragment()).toMatchSnapshot();
  });
});
