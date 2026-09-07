import "./BusinessCard.css";

const categoryIcons = {
  Handicrafts: "🎨",
  Cooking: "🍱",
  Tailoring: "🧵",
  Tutoring: "📚",
};

export default function BusinessCard({ name, category, image }) {
  return (
    <article className="business-card">
      {image ? (
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="business-image"
        />
      ) : (
        <div className="business-placeholder" aria-hidden="true">
          {categoryIcons[category] || "🏠"}
        </div>
      )}

      <div className="business-info">
        <h3>{name}</h3>
        <p>{category}</p>
        <button type="button">View Profile</button>
      </div>
    </article>
  );
}