import styles from './Recipe.module.css';

export default function Recipe({
  id,
  name,
  instructions,
  description,
  servings,
  ingredients,
  image,
  total_time,
  source_url,
  rating,
  handleRecipe,
  addOrRemove,
}) {
  return (
    <main className={styles.container}>
      <h2>{name}</h2>
      <p>{source_url}</p>
      <p>{rating}</p>
      <button onClick={() => handleRecipe(id, name)}>{addOrRemove}</button>
      <img className={styles.img} src={image} alt={name} />
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
