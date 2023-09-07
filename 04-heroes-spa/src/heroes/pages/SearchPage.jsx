import { useMemo } from "react";
import queryString from "query-string";

import { HeroCard } from "../components";
import { useForm } from "../hooks/useForm";
import { useLocation, useNavigate } from "react-router-dom";
import { getHeroByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);

  const heroes = useMemo(() => getHeroByName(q), [q]);

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const onSearchSubmit = (e) => {
    e.preventDefault();

    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>

          <form onSubmit={onSearchSubmit} aria-label="form">
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              value={searchText}
              onChange={onInputChange}
              autoComplete="off"
            />

            <button type="submit" className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Result</h4>
          <hr />

          <div
            aria-label="div-search"
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? "" : "none" }}
          >
            Search a hero
          </div>
          <div
            aria-label="div-error"
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? "" : "none" }}
          >
            No hero with <b>{q}</b>
          </div>

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
