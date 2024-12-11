import axios from "axios";
import {
  type EvolutionChainLink,
  type EvolutionChainResponse,
  type Pokemon,
  type PokemonSpecies,
} from "../types";

const API_URL = "https://pokeapi.co/api/v2";

const fetchEvolutionChain = async (
  speciesUrl: string,
): Promise<{ id: string; name: string; image: string }[]> => {
  try {
    const speciesResponse = await axios.get<PokemonSpecies>(speciesUrl);
    const evolutionChainUrl = speciesResponse.data.evolution_chain?.url;
    if (!evolutionChainUrl) return [];

    const evolutionResponse =
      await axios.get<EvolutionChainResponse>(evolutionChainUrl);

    const parseEvolution = async (
      chain: EvolutionChainLink,
    ): Promise<{ id: string; name: string; image: string }[]> => {
      const evolutions: { id: string; name: string; image: string }[] = [];

      if (chain.species?.name && chain.species?.url) {
        const id = chain.species.url.split("/").slice(-2, -1)[0];
        const detailsResponse = await axios.get<Pokemon>(
          `${API_URL}/pokemon/${id}`,
        );
        const image = detailsResponse.data.sprites.front_default;

        evolutions.push({ id: id ?? "", name: chain.species.name, image });
      }

      if (chain.evolves_to && chain.evolves_to.length > 0) {
        for (const nextEvolution of chain.evolves_to) {
          const nextEvolutions = await parseEvolution(nextEvolution);
          evolutions.push(...nextEvolutions);
        }
      }

      return evolutions;
    };

    return parseEvolution(evolutionResponse.data.chain);
  } catch (error) {
    console.error("Failed to fetch evolution chain:", error);
    return [];
  }
};

export const getAllPokemon = async (limit = 20): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(`${API_URL}/pokemon?limit=${limit}`);
    const pokemonList = response.data.results;

    const detailedPokemon: Pokemon[] = await Promise.all(
      pokemonList.map(async (pokemon: { url: string }) => {
        const detailsResponse = await axios.get<Pokemon>(pokemon.url);
        const speciesResponse = await axios.get<PokemonSpecies>(
          detailsResponse.data.species.url,
        );
        const evolutionChain = await fetchEvolutionChain(
          detailsResponse.data.species.url,
        );

        return {
          ...detailsResponse.data,
          generation: speciesResponse.data.generation.name,
          evolution_chain: evolutionChain,
        };
      }),
    );

    return detailedPokemon.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Failed to fetch all Pokémon:", error);
    return [];
  }
};

export const getPokemonDetails = async (id: number): Promise<Pokemon> => {
  try {
    const pokemonResponse = await axios.get<Pokemon>(
      `${API_URL}/pokemon/${id}`,
    );
    const speciesResponse = await axios.get<PokemonSpecies>(
      pokemonResponse.data.species.url,
    );

    const evolutionChain = pokemonResponse.data.species.url
      ? await fetchEvolutionChain(pokemonResponse.data.species.url)
      : [];

    return {
      ...pokemonResponse.data,
      generation: speciesResponse.data.generation.name,
      evolution_chain: evolutionChain,
    };
  } catch (error) {
    console.error(`Failed to fetch details for Pokémon ID ${id}:`, error);
    throw error;
  }
};
