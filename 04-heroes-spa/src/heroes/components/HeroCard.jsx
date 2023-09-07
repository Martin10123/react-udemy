import { Link } from "react-router-dom";

const CharactersByHero = ({ alter_ego, characters }) => {
  if (alter_ego === characters) return <></>;

  return <p>{characters}</p>;
};

export const HeroCard = ({
  id,
  superhero,
  alter_ego,
  first_appearance,
  characters,
}) => {
  const heroUrl = `/assets/heroes/${id}.jpg`;

  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroUrl} alt={superhero} className="card-img" />
          </div>

          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>

              <CharactersByHero alter_ego={alter_ego} characters={characters} />

              <div className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </div>

              <Link to={`/hero/${id}`}> Más... </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
