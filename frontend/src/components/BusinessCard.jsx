import "./BusinessCard.css";

export default function BusinessCard({ name, category, image }) {
  return (
    <article className="business-card">
      <img src={image} alt={`${name}`} loading="lazy" className="business-image" />
      <div className="business-info">
        <h3>{name}</h3>
        <p>{category}</p>
      </div>
    </article>
  );
}
