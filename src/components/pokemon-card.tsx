import React from "react";
import { type Pokemon } from "../types/";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const typeColors: Record<string, string> = {
    grass: "bg-green-500",
    poison: "bg-purple-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    normal: "bg-gray-500",
    electric: "bg-yellow-500",
    ice: "bg-cyan-500",
    fighting: "bg-orange-500",
    psychic: "bg-pink-500",
    bug: "bg-green-700",
    rock: "bg-gray-700",
    ghost: "bg-purple-700",
    dark: "bg-gray-800",
    dragon: "bg-indigo-700",
    fairy: "bg-pink-700",
    steel: "bg-gray-400",
    ground: "bg-yellow-700",
    flying: "bg-blue-300",
  };

  return (
    <Link href={`/pokemon/${pokemon.id}?${queryString}`}>
      <div className="flex max-w-sm cursor-pointer flex-col items-center rounded-lg border bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mb-4 h-32 w-32"
          width={128}
          height={128}
        />
        <h2 className="text-xl font-bold capitalize text-gray-800">
          {pokemon.name}
        </h2>
        <p className="mb-2 text-sm text-gray-600">
          Generation: {pokemon.generation}
        </p>
        <div className="mb-4 flex gap-2">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`rounded-full px-2 py-1 text-xs font-medium text-white ${typeColors[type.name] ?? "bg-gray-400"}`}
            >
              {type.name}
            </span>
          ))}
        </div>
        <p className="mb-2 text-sm text-gray-600">
          <strong>Abilities:</strong>{" "}
          {pokemon.abilities.map((a) => (
            <span key={a.ability.name} className="capitalize">
              {a.ability.name}{" "}
            </span>
          ))}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Base Exp:</strong> {pokemon.base_experience}
        </p>
      </div>
    </Link>
  );
};

export default PokemonCard;
