import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "./store/slices/pokemon";

export const PokemonApp = () => {
  const { isLoading, pokemons, page } = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  const nextPokemons = () => {
    dispatch(getPokemons(page));
  };

  return (
    <>
      <h1>Pokemon App</h1>
      <hr />
      <span>loading: {isLoading ? "true" : "false"}</span>

      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>

      <button disabled={isLoading} onClick={nextPokemons}>
        Next page
      </button>
    </>
  );
};
