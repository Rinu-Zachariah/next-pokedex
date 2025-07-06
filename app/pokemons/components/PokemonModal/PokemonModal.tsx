'use client';
import React, { useEffect, useState } from 'react';
import { IPokemon } from '@/typings';
import { fetchPokemonByName, getPokemonSpriteUrl } from '@/utils';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { sentenceCaseConversion } from '@/utilities';
import { PokemonStatNames, PokemonTypesColors } from '@/constants';

interface IProps {
  name: string;
  open: boolean;
  onClose: () => void;
}

const PokemonModal: React.FC<IProps> = ({ name, open, onClose }) => {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [showShiny, setShowShiny] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    if (!open || !name) return;
    setLoading(true);
    setError('');
    setPokemon(null);

    fetchPokemonByName(name)
      .then(data => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(err => {
        setError(`Failed to load Pokemon Details : ${err.message}`);
        setLoading(false);
      });
  }, [name, open]);

  return (
    <Dialog open={open} onOpenChange={(opened) => { if (!opened) onClose(); }}>
      <DialogContent
        data-testid="dialog-content"
        className="max-w-md rounded-xl bg-white shadow-xl p-6 flex flex-col items-center space-y-4"
      >
        <div className="flex flex-col items-center w-full">
          {pokemon && (
            <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center shadow-lg mb-2">
              <img
                src={showShiny ? pokemon?.sprites?.front_shiny : getPokemonSpriteUrl(pokemon.id)}
                alt={`${name} sprite`}
                width={100}
                height={100}
                className="drop-shadow-md"
              />
            </div>
          )}
          <button
            onClick={() => setShowShiny((s) => !s)}
            className="
              text-xs mb-2 text-blue-600 underline rounded
              focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2
              dark:focus:ring-blue-400
            "
            aria-label={showShiny ? "Show normal sprite" : "Show shiny sprite"}
          >
            {showShiny ? "Show Normal" : "Show Shiny"}
          </button>
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-extrabold mb-1 text-center text-blue-900 dark:text-blue-300 drop-shadow">
              {pokemon?.name ? sentenceCaseConversion(pokemon?.name) : sentenceCaseConversion(name)}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Details and stats
          </DialogDescription>
        </div>
        <div className="w-full flex flex-col items-center text-center gap-1">
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {pokemon && (
            <>
              <div className="text-gray-600 dark:text-gray-400 font-mono text-sm mb-2">#{pokemon?.id}</div>
              <div className="flex flex-wrap justify-center gap-2 mb-2">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${PokemonTypesColors[t.type.name] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-base">
                <span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Height:</span>
                  &nbsp;{pokemon?.height / 10} m
                </span>
                <span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Weight:</span>
                  &nbsp;{pokemon?.weight / 10} kg
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 w-4/5 my-2" />
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">Abilities:</span>
                &nbsp;{pokemon?.abilities.map((a) => sentenceCaseConversion(a.ability.name)).join(', ')}
              </div>
              <div className="w-full mt-3">
                <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Base Stats</div>
                <div className="flex flex-col gap-1">
                  {pokemon?.stats?.map(stat => (
                    <div key={stat.stat.name} className="flex items-center gap-2">
                      <span className="w-20 text-right text-xs font-medium capitalize">{PokemonStatNames[stat.stat.name] || stat.stat.name}</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded h-3">
                        <div
                          className="bg-blue-500 h-3 rounded"
                          style={{ width: `${(stat.base_stat / 200) * 100}%` }}
                        />
                      </div>
                      <span className="w-6 text-left text-xs">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <DialogClose asChild>
          <button
            className="
              mt-6 px-6 py-2 rounded-full bg-blue-800/90 text-white font-bold
              shadow hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonModal;