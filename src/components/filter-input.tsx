import React from "react";

interface FilterInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        id={label.toLowerCase()}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default FilterInput;
