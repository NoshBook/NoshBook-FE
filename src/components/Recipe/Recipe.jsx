import styles from './Recipe.module.css';
import { Rating } from 'react-simple-star-rating';

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
  handleRating,
}) {
  return (
    <main className={styles.container}>
      <h2>{name}</h2>
      <p>{source_url}</p>
      <Rating
        onClick={handleRating}
        initialValue={rating}
        showTooltip
        tooltipArray={[
          'Never again',
          'Pretty bad',
          'Average',
          'Pretty good',
          "Chef's kiss",
        ]}
      />
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
