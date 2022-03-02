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
      <section className={styles.detailheader}>
        <h2>{name}</h2>
        {source_url && <a href={source_url}>Source</a>}
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
      </section>
      <img className={styles.img} src={image} alt={name} />
      <article className={styles.detailbody}>
        <section>{description}</section>
        <section>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Instructions</h3>

          <ul>
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </section>
        <section>
          {total_time && <p>Time: {total_time}</p>}
          <h3>Servings: {servings}</h3>
        </section>
      </article>
    </main>
  );
}
