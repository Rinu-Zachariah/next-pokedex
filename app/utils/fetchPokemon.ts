import { IEvolutionTriggerList, IPokemon, IPokemonList } from "../typings";

const POKEAPI_BASE_URL = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2';
const POKEAPI_IMAGE_URL = process.env.NEXT_PUBLIC_HIGH_QUALITY_IMAGE_URL || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

const errorStatusMessages = (errorStatus: number, targetedArea: string): string => {
  const messages: Record<number, string> = {
    401: 'Seems like you are not authorized to access this resource',
    404: `${targetedArea} not found`,
    429: 'Too many requests, please try again later',
  }
  return messages[errorStatus] || `Failed to fetch ${targetedArea}, please try again later`;
}

export async function fetchPokemonList(limit: number, offset: number): Promise<IPokemonList> {
  const res = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error(errorStatusMessages(res.status, 'Pokemon list'));
  return res.json();
}

export async function fetchPokemonByName(name: string): Promise<IPokemon> {
  const res = await fetch(`${POKEAPI_BASE_URL}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error(errorStatusMessages(res.status, 'Pokemon'));
  return res.json();
}

export async function fetchEvolutionTriggerList(limit: number, offset: number): Promise<IEvolutionTriggerList> {
  const res = await fetch(`${POKEAPI_BASE_URL}/evolution-trigger?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error(errorStatusMessages(res.status, 'Evoultion Trigger List'));
  return res.json();
}

export async function getPokemonIdByName(name: string): Promise<number | null> {
  const res = await fetch(`${POKEAPI_BASE_URL}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.id;
}

export const getPokemonSpriteUrl = (id: number) => `${POKEAPI_IMAGE_URL}/${id}.png`;
