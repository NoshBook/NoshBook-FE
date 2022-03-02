import React, { ChangeEvent, FormEvent, useState } from 'react';
import { RecipeFormProps } from './recipeTypes';

export default function RecipeForm({
  initialFormState,
  handleSubmit
}: RecipeFormProps) {
  const [formState, setFormState] = useState(initialFormState);
  const [ingredients, setIngredients] = useState(initialFormState.ingredients ?? []);
  const [instructions, setInstructions] = useState(initialFormState.instructions ?? []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleIngredientsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [, indexString] = name.split(':');
    const index = parseInt(indexString);
    setIngredients((prevState: any) => [...prevState].map((val: string | Array<string>, i: number) => i === index ? value : val));
  };

  const handleInstructionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [, indexString] = name.split(':');
    const index = parseInt(indexString);
    setInstructions((prevState: any) => [...prevState].map((val: string | Array<string>, i: number) => i === index ? value : val));
  };

  const addIngredient = () => {
    setIngredients((prevState: any) => [...prevState, '']);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prevState: any) => [...prevState].filter((val: any, i: number) => i !== index));
  };

  const addInstruction = () => {
    setInstructions((prevState: any) => [...prevState, '']);
  };

  const removeInstruction = (index: number) => {
    setInstructions((prevState: any) => [...prevState].filter((val: any, i: number) => i !== index));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit({ ...formState, ingredients, instructions });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Recipe Name:
        <input
          type='text'
          name='name'
          value={formState.name ?? ''}
          onChange={handleChange}
        />
      </label>
      {/* bleh TODO: image upload
      <img src={image} alt={name} />
      */}
      <label>
        Description:
        <input
          type='text'
          name='description'
          value={formState.description ?? ''}
          onChange={handleChange}
        />
      </label>
      <article>
        <section>
          Ingredients:
          {ingredients.map((ingredient: any, index: number) => (
            <div key={index}>
              <input
                name={'ingredient:' + index}
                value={ingredients[index]}
                onChange={handleIngredientsChange}
              />
              <button onClick={() => removeIngredient(index)}>Remove Ingredient</button>
            </div>
          ))}
          <button onClick={addIngredient}>Add an Ingredient</button>
        </section>
        <section>
          Instructions:
          {instructions.map((instruction: any, index: number) => (
            <div key={index}>
              <label>
                Step {index + 1}:
                <input
                  name={'instruction:' + index}
                  value={instructions[index]}
                  onChange={handleInstructionsChange}
                />
                <button onClick={() => removeInstruction(index)}>Remove Step</button>
              </label>
            </div>
          ))}
          <button onClick={addInstruction}>Add a Step</button>
        </section>
        <section>
          Tags:
          {instructions.map((instruction: any, index: number) => (
            <div key={index}>
              <label>
                <input
                  name={'instruction:' + index}
                  value={instructions[index]}
                  onChange={handleInstructionsChange}
                />
                <button onClick={() => removeInstruction(index)}>Remove Tag</button>
              </label>
            </div>
          ))}
          <button onClick={addInstruction}>Add a Tag</button>
        </section>
        <section>
          <label>
            Time Required:
            <input
              type='text'
              name='totalTime'
              value={formState.totalTime ?? ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Servings:
            <input
              type='text'
              name='servings'
              value={formState.servings ?? ''}
              onChange={handleChange}
            />
          </label>
        </section>
      </article>
      <button type='submit'>Submit</button>
    </form>
  );
}
