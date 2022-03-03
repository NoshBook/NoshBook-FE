import styles from './Recipe.module.css';
import { Rating } from 'react-simple-star-rating';
import DaysMenu from '../DaysMenu/DaysMenu';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';

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
  added,
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
          tooltipDefaultText="Add your rating!"
          size={25}
          tooltipStyle={{ background: 'none', padding: 0, margin: '5px' }}
          tooltipArray={[
            'Never again',
            'Pretty bad',
            'Average',
            'Pretty good',
            "Chef's kiss",
          ]}
        />
        <div className={styles.buttoncontainer}>
          <button
            aria-label={addOrRemove}
            title={
              added
                ? 'This recipe is in your cookbook.'
                : 'Add this recipe to your cookbook!'
            }
            onClick={() => handleRecipe(id, name)}
          >
            {added ? (
              <AiOutlineMinusCircle color={'var(--orange)'} />
            ) : (
              <AiOutlinePlusCircle color={'var(--blue)'} />
            )}{' '}
            Cookbook
          </button>
          <div className={styles.daysmenucontainer}>
            <button
              aria-label="Add to Planner"
              title="Click to add to a day on your planner!"
              className={styles.plannerbutton}
              onClick={() => setPlannerToggle(!plannerToggle)}
            >
              <AiOutlinePlusCircle color={'var(--blue)'} /> Planner
            </button>
            {plannerToggle && (
              <DaysMenu handleAddToPlanner={handleAddToPlanner} recipeId={id} />
            )}
          </div>
        </div>
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
