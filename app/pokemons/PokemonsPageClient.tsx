'use client';
import React from 'react';
import { IPokemonRow } from '@/typings';
import { FilterInput, PokemonTable } from "./components";

interface IProps {
  pokemonList: IPokemonRow[];
  count: number;
  page: number;
  pageSize: number;
  filterName: string;
  error: string;
}

export default function PokemonsPageClient(props: IProps) {
  return (
    <>
      <FilterInput searchText={props.filterName} />
      <PokemonTable {...props} />
    </>
  );
}