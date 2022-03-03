import React, { ChangeEvent, FormEvent, useState } from 'react';
import { RecipeFormProps } from './recipeTypes';
import styles from './RecipeForm.module.css';
import { motion } from 'framer-motion';
import { upfadeinVariants } from '../../utils/variants';

export default function RecipeForm({
  initialFormState,
  handleSubmit,
}: RecipeFormProps) {
  const [formState, setFormState] = useState(initialFormState);
  const [ingredients, setIngredients] = useState(
    initialFormState.ingredients ?? [],
  );
  const [instructions, setInstructions] = useState(
    initialFormState.instructions ?? [],
  );
  const [tags, setTags] = useState(initialFormState.tags ?? []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleIngredientsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [, indexString] = name.split(':');
    const index = parseInt(indexString);
    setIngredients((prevState: any) =>
      [...prevState].map((val: string | Array<string>, i: number) =>
        i === index ? value : val,
      ),
    );
  };

  const handleInstructionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [, indexString] = name.split(':');
    const index = parseInt(indexString);
    setInstructions((prevState: any) =>
      [...prevState].map((val: string | Array<string>, i: number) =>
        i === index ? value : val,
      ),
    );
  };

  const handleTagsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [, indexString] = name.split(':');
    const index = parseInt(indexString);
    setTags((prevState: any) =>
      [...prevState].map((val: string | Array<string>, i: number) =>
        i === index ? value : val,
      ),
    );
  };

  const addIngredient = () => {
    setIngredients((prevState: any) => [...prevState, '']);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prevState: any) =>
      [...prevState].filter((val: any, i: number) => i !== index),
    );
  };

  const addInstruction = () => {
    setInstructions((prevState: any) => [...prevState, '']);
  };

  const removeInstruction = (index: number) => {
    setInstructions((prevState: any) =>
      [...prevState].filter((val: any, i: number) => i !== index),
    );
  };

  const addTag = () => {
    setTags((prevState: any) => [...prevState, '']);
  };

  const removeTag = (index: number) => {
    setTags((prevState: any) =>
      [...prevState].filter((val: any, i: number) => i !== index),
    );
  };

  const handleFormSubmit = () => {
    handleSubmit({ ...formState, ingredients, instructions, tags });
  };

  return (
    <motion.div
      variants={upfadeinVariants}
      initial={'initial'}
      animate={'animate'}
      className={styles.viewcontainer}
    >
      <h2 className={styles.formheader}>
        {formState.id ? 'Edit recipe' : 'Create a recipe'}
      </h2>
      <main className={styles.subcontainer}>
        <section className={styles.formcontainer}>
          <label>
            Recipe Name
            <input
              type="text"
              name="name"
              value={formState.name ?? ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Image URL
            <input
              type="url"
              name="image"
              value={formState.image ?? ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              value={formState.description ?? ''}
              onChange={handleChange}
            />
          </label>
        </section>

        <section className={styles.formcontainer}>
          <span className={styles.subheader}>Ingredients</span>
          {ingredients.map((ingredient: any, index: number) => (
            <div key={index}>
              <input
                name={'ingredient:' + index}
                value={ingredients[index]}
                onChange={handleIngredientsChange}
              />
              <button onClick={() => removeIngredient(index)}>
                Remove Ingredient
              </button>
            </div>
          ))}
          <button onClick={addIngredient}>Add an Ingredient</button>
        </section>

        <section className={styles.formcontainer}>
          <span className={styles.subheader}>Instructions</span>
          {instructions.map((instruction: any, index: number) => (
            <div key={index}>
              <label>
                Step {index + 1}:
                <input
                  name={'instruction:' + index}
                  value={instructions[index]}
                  onChange={handleInstructionsChange}
                />
                <button onClick={() => removeInstruction(index)}>
                  Remove Step
                </button>
              </label>
            </div>
          ))}
          <button onClick={addInstruction}>Add a Step</button>
        </section>

        <section className={styles.formcontainer}>
          <span className={styles.subheader}>Tags</span>
          {tags.map((tag: any, index: number) => (
            <div key={index}>
              <label>
                <input
                  name={'tag:' + index}
                  value={tags[index]}
                  onChange={handleTagsChange}
                />
                <button onClick={() => removeTag(index)}>Remove Tag</button>
              </label>
            </div>
          ))}
          <button onClick={addTag}>Add a Tag</button>
        </section>

        <section className={styles.formcontainer}>
          <label>
            Time Required
            <input
              type="text"
              name="totalTime"
              value={formState.totalTime ?? ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Servings
            <input
              type="text"
              name="servings"
              value={formState.servings ?? ''}
              onChange={handleChange}
            />
          </label>
        </section>
      </main>
      <button
        className={styles.submitbutton}
        type="submit"
        onClick={handleFormSubmit}
      >
        Submit
      </button>
    </motion.div>
  );
}
