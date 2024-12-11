"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { getPokemonDetails } from "../../../services";
import { type Pokemon } from "../../../types";

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (id) {
        const details = await getPokemonDetails(Number(id));
        setPokemon(details);
      }
    };

    void fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleEvolutionClick = (evolutionId: string) => {
    router.push(`/pokemon/${evolutionId}`);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-4xl font-bold capitalize">
        {pokemon.name}
      </h1>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-col items-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="h-64 w-64"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <h2 className="mb-4 text-2xl font-semibold">Details</h2>
          <ul className="space-y-2">
            <li>
              <strong>Generation:</strong> {pokemon.generation}
            </li>
            <li>
              <strong>Types:</strong>{" "}
              {pokemon.types.map((type) => type.type.name).join(", ")}
            </li>
          </ul>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">Stats</h2>
          <ul className="space-y-2">
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                <strong>{stat.stat.name}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Evolutions</h2>
        <div className="flex flex-wrap gap-4">
          {pokemon.evolution_chain?.map((evolution, index) => {
            const isCurrent = evolution.name === pokemon.name.toLowerCase();
            return (
              <div
                key={index}
                onClick={() => !isCurrent && handleEvolutionClick(evolution.id)}
                className={`cursor-pointer rounded-lg border p-4 ${
                  isCurrent
                    ? "cursor-default bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <img
                  src={evolution.image}
                  alt={evolution.name}
                  className="mb-2 h-16 w-16"
                />
                <h3 className="text-center capitalize">{evolution.name}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <button
          onClick={() => router.push(`/?${queryString}`)}
          className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
