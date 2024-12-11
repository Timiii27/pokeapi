export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
}

export interface PokemonSpecies {
  generation: {
    name: string;
    url: string;
  };
  evolution_chain: {
    url: string;
  };
}
interface PokemonStat {
  stat: { name: string };
  base_stat: number;
}
export interface EvolutionChainLink {
  species?: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
}
export interface EvolutionChainResponse {
  chain: EvolutionChainLink;
}
export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  base_experience: number;
  sprites: PokemonSprites;
  species: {
    name: string;
    url: string;
  };
  generation: string;
  evolution_chain: { id: string; name: string; image: string }[];
  stats: PokemonStat[];
}
