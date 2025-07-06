export interface IResult {
  pokemonList: { name: string; url: string, id?: number }[];
  count: number;
  error: string;
}