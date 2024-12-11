/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { getAllPokemon } from "../services";
import PokemonCard from "../components/pokemon-card";
import PokemonFilters from "../components/pokemon-filters";
import { type Pokemon } from "../types";
import { useRouter, useSearchParams } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);

  const [typeFilter, setTypeFilter] = useState<string>(
    searchParams.get("type") ?? "",
  );
  const [generationFilter, setGenerationFilter] = useState<string>(
    searchParams.get("generation") ?? "",
  );
  const [searchFilter, setSearchFilter] = useState<string>(
    searchParams.get("search") ?? "",
  );
  const generationMap: Record<string, string> = {
    "1": "generation-i",
    "2": "generation-ii",
    "3": "generation-iii",
    "4": "generation-iv",
    "5": "generation-v",
    "6": "generation-vi",
    "7": "generation-vii",
    "8": "generation-viii",
    "9": "generation-ix",
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getAllPokemon(50);
      setPokemonList(data);
      setFilteredPokemonList(data);
    };

    void fetchPokemon();
  }, []);

  useEffect(() => {
    const filterPokemon = () => {
      const generationCode = generationMap[generationFilter.trim()];
      const filtered = pokemonList.filter((pokemon) => {
        const matchesType = pokemon.types.some((type) =>
          type.type.name.toLowerCase().includes(typeFilter.toLowerCase()),
        );
        const matchesGeneration = generationCode
          ? pokemon.generation.toLowerCase().includes(generationCode)
          : true;
        const matchesSearch =
          pokemon.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          pokemon.evolution_chain.some((evo) =>
            evo.name.toLowerCase().includes(searchFilter.toLowerCase()),
          );

        return matchesType && matchesGeneration && matchesSearch;
      });

      setFilteredPokemonList(filtered);
    };

    filterPokemon();
  }, [typeFilter, generationFilter, searchFilter, pokemonList]);
  useEffect(() => {
    const params = new URLSearchParams();

    if (typeFilter) params.set("type", typeFilter);
    if (generationFilter) params.set("generation", generationFilter);
    if (searchFilter) params.set("search", searchFilter);

    router.replace(`/?${params.toString()}`);
  }, [typeFilter, generationFilter, searchFilter]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">Pokémon List</h1>

      <PokemonFilters
        typeFilter={typeFilter}
        generationFilter={generationFilter}
        onTypeChange={setTypeFilter}
        onGenerationChange={setGenerationFilter}
        searchFilter={searchFilter}
        onSearchChange={setSearchFilter}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
