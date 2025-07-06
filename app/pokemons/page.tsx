import React from 'react';
import { getPokemonData } from "../utils";
import { ISearchParams } from "../typings";
import { PAGE_SIZE } from "../constants";
import PokemonsPageClient from "./PokemonsPageClient";

interface IProps {
  searchParams: ISearchParams
}

const PokemonsPage = async ({ searchParams }: IProps) => {
  const page = Number(searchParams.page) || 1;
  const name = searchParams.name?.trim() || '';
  const { pokemonList, count, error } = await getPokemonData(name, page);

  return (
    <PokemonsPageClient
      pokemonList={pokemonList}
      count={count}
      page={page}
      pageSize={PAGE_SIZE}
      filterName={name}
      error={error}
    />
  );
}

export default PokemonsPage;