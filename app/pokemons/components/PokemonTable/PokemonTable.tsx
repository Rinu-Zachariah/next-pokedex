'use client';
import React, { useState } from 'react';
import {
  useReactTable, getCoreRowModel, flexRender, ColumnDef,
} from '@tanstack/react-table';
import { getPokemonSpriteUrl } from '@/utils';
import { IPokemonRow } from '@/typings';
import EmptyPokemonList from '../EmptyPokemonList';
import PokemonModal from '../PokemonModal';
import Pagination from '../Pagination';

interface IProps {
  pokemonList: IPokemonRow[];
  count: number;
  page: number;
  pageSize: number;
  filterName: string;
  error: string;
}

const PokemonTable: React.FC<IProps> = ({
  pokemonList, count, page, pageSize, filterName, error
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const isPokemonListEmpty = (!pokemonList || pokemonList.length === 0);

  const columns: ColumnDef<IPokemonRow>[] = [
    {
      header: 'Image',
      accessorKey: 'url',
      cell: info => {
        const url = info.getValue() as string;
        const pokemonId = Number(url.split('/').filter(Boolean).pop() || '');
        const { id, name: originalName } = info.row.original;
        const name = (originalName || 'pokemon').replace(/-/g, ' ');

        return (
          <img
            src={getPokemonSpriteUrl(id || pokemonId)}
            alt={`${name} sprite`}
            width={28}
            height={38}
            loading="lazy"
            className="object-contain w-28 h-28 md:w-28 md:h-28 mx-auto"
            onError={e => ((e.target as HTMLImageElement).src = 'assets/pokeball.png')}
          />
        );
      },
      enableSorting: false,
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: info => (
        <span className="text-blue-900 font-semibold capitalize">
          {info.getValue() as string}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: pokemonList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(count / pageSize),
    state: {
      pagination: { pageIndex: page - 1, pageSize },
    },
  });

  return (
    <>
      {(isPokemonListEmpty || error ) ? (
        <EmptyPokemonList searchText={filterName} error={error} />
      ) : (
        <>
          <table className='min-w-full border-collapse mb-4 text-sm md:text-base'>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="bg-gray-100">
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className={
                          header.column.id === 'url'
                            ? "text-center px-3 py-2"
                            : "text-left px-3 py-2"
                        }
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 border-b cursor-pointer"
                  tabIndex={0}
                  aria-label={`View details for ${row.original.name}`}
                  onClick={() => setSelectedPokemon(row.original.name)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') setSelectedPokemon(row.original.name);
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className={
                        cell.column.id === 'url'
                          ? "text-center py-2"
                          : "text-left py-2"
                      }
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            total={count} page={page}
            pageSize={pageSize} filterName={filterName}
          />

          {selectedPokemon && (
            <PokemonModal name={selectedPokemon} open={!!selectedPokemon} onClose={() => setSelectedPokemon(null)} />
          )}
        </>
      )}
    </>
  );
};

export default PokemonTable;