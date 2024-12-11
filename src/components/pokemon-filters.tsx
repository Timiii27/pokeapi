import React from "react";
import FilterInput from "./filter-input";

type PokemonFiltersProps = {
  typeFilter: string;
  generationFilter: string;
  searchFilter: string;
  onTypeChange: (value: string) => void;
  onGenerationChange: (value: string) => void;
  onSearchChange: (value: string) => void;
};

const PokemonFilters: React.FC<PokemonFiltersProps> = ({
  typeFilter,
  generationFilter,
  searchFilter,
  onTypeChange,
  onGenerationChange,
  onSearchChange,
}) => {
  return (
    <div className="mb-4 flex w-full gap-4">
      <FilterInput
        label="Type"
        placeholder="Enter Pokémon type (e.g., Fire)"
        value={typeFilter}
        onChange={onTypeChange}
      />
      <FilterInput
        label="Generation"
        placeholder="Enter generation (e.g., 1-9)"
        value={generationFilter}
        onChange={onGenerationChange}
      />
      <FilterInput
        label="Search"
        placeholder="Enter Pokémon name or evolution chain (e.g., Pikachu)"
        value={searchFilter}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default PokemonFilters;
