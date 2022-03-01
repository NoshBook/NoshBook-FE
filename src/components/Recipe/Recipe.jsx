import styles from './Recipe.module.css';
import { Rating } from 'react-simple-star-rating';
import DaysMenu from '../DaysMenu/DaysMenu';

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
  plannerToggle,
  setPlannerToggle,
  handleAddToPlanner,
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
      <button aria-label={addOrRemove} onClick={() => handleRecipe(id, name)}>
        {addOrRemove}
      </button>
      <button
        aria-label="Add to Planner"
        className={styles.plannerbutton}
        onClick={() => setPlannerToggle(!plannerToggle)}
      >
        Add to Planner
      </button>
      {plannerToggle && <DaysMenu handleAddToPlanner={handleAddToPlanner} />}
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
