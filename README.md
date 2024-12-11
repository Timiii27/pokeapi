# PokeAPI App

A Next.js application to explore Pokémon using data from the PokeAPI.

## Features

- View a list of Pokémon with filters for type, generation, and name search.
- See detailed information about each Pokémon, including evolutions, stats, and more.
- Navigate between Pokémon evolutions seamlessly.
- Retain filters and search parameters when navigating back to the list.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

git clone https://github.com/Timiii27/pokeapi.git

### 2. Navigate to the Project Directory

cd pokeapi

### 3. Install Dependencies

pnpm install

### 4. Start the Development Server

pnpm run dev

### 5. Open the Project in the Browser

By default, the app runs at [http://localhost:3000](http://localhost:3000). Open this URL in your browser to explore the app.

## Technologies Used

- **Next.js**: Framework for building the application.
- **TypeScript**: Strongly typed programming language for safer and cleaner code.
- **Tailwind CSS**: For styling the application.
- **PokeAPI**: Source of Pokémon data.

## Project Structure

- **`pages`**: Contains main application pages like the home and detail pages.
- **`components`**: Reusable UI components like `PokemonCard` and `PokemonFilters`.
- **`services`**: Handles API requests and data fetching.
- **`types`**: TypeScript types for data models used throughout the application.

## Scripts

- **`pnpm dev`**: Starts the development server.
- **`pnpm build`**: Builds the application for production.
- **`pnpm start`**: Runs the production build.
- **`pnpm lint`**: Lints the codebase.

## Contributions

Feel free to fork this repository and submit pull requests with new features or improvements.

## License

This project is open-source and available under the [MIT License](LICENSE).