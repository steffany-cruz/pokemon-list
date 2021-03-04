import Pikachu from "../assets/images/confused_pikachujpg.jpg";

export default function NotFound() {
  return (
    <div className="not-found-content">
      <img src={Pikachu} alt="" />
      <h2>Couldn't find that Pokémon...</h2>
    </div>
  );
}
