import { PAGE_SIZE } from "../constants";
import { IResult } from "../typings";
import { fetchPokemonByName, fetchPokemonList } from "./fetchPokemon";

const POKEAPI_BASE_URL = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2';

export async function getPokemonData(name: string, page: number): Promise<IResult> {
  try {
    if (name) {
      const pokemon = await fetchPokemonByName(name);
      return {
        pokemonList: [{ name: pokemon.name, url: `${POKEAPI_BASE_URL}/pokemon/${pokemon.name}`, id: pokemon.id }],
        count: 1,
        error: ''
      };
    } else {
      const data = await fetchPokemonList(PAGE_SIZE, (page - 1) * PAGE_SIZE);
      return {
        pokemonList: data.results,
        count: data.count,
        error: ''
      };
    }
  } catch (err) {
    return { pokemonList: [], count: 0, error: (err as Error).message };
  }
}