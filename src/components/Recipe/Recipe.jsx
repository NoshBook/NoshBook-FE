export default function Recipe({
  name,
  instructions,
  description,
  servings,
  ingredients,
  image,
  total_time,
  source_url,
  rating,
  ratings_count,
}) {
  return (
    <main>
      <h2>{name}</h2>
      <p>{source_url}</p>
      <p>{rating}</p>
      <p>{ratings_count}</p>
      <img src={image} alt={name} />
      <p>{description}</p>
      <article>
        <section>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>
        <section>
          <ul>
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </section>
        <section>
          <p>Time: {total_time}</p>
          <p>Servings: {servings}</p>
        </section>
      </article>
    </main>
  );
}
