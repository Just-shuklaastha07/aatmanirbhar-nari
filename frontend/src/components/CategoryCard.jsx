import "./CategoryCard.css";

export default function CategoryCard({ name, icon }) {
  return (
    <article className="category-card">
      <div className="category-icon" aria-hidden="true">
        {icon}
      </div>

      <h3>{name}</h3>
      <button type="button" className="category-button">
        Explore
      </button>
    </article>
  );
}