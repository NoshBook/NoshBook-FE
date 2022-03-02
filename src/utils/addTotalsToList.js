import { parse } from 'recipe-ingredient-parser-v3';

export default function addTotals(list) {
  const parsedList = list.map((item) => {
    const parsed = parse(item.ingredient, 'eng');
    const sanitized = sanitizeIngredient(parsed.ingredient).trim();
    const parsedIngredient = { ...parsed, ingredient: sanitized };

    return { ...item, parsedIngredient };
  });

  const sortedList = sortIngredients(parsedList);
  const listWithTotals = makeSubGroupsWithTotals(sortedList);

  return listWithTotals;
}

const createTotalString = ({ quantity, unit, unitPlural, ingredient }) => {
  let ingredientString = '';
  if (!quantity) {
    ingredientString = `${ingredient}`;
  } else if (!unit) {
    ingredientString = `${quantity} ${ingredient}`;
  } else if (quantity === 1) {
    ingredientString = `${quantity} ${unit} ${ingredient}`;
  } else {
    ingredientString = `${quantity} ${unitPlural} ${ingredient}`;
  }

  return `Total: ${ingredientString}`;
};

const sanitizeIngredient = (ingredient) => {
  const badWords = ['tablespoon', 'teaspoon', 'ounce'];
  let ingred = ingredient;
  if (ingredient.includes(',') && !ingredient.includes('(')) {
    const commaSplit = ingredient.split(',');
    commaSplit.pop();
    ingred = commaSplit.join(' ');
  }

  const spaceSplit = ingred.split(' ');
  if (badWords.includes(spaceSplit[0])) spaceSplit[0] = '';
  return spaceSplit.join(' ');
};

const sortIngredients = (list) => {
  const compareIngredients = (a, b) => {
    if (a.ingredient > b.ingredient) return 1;
    if (a.ingredient < b.ingredient) return -1;
    return 0;
  };
  const sortedIngredients = list.sort(compareIngredients);
  return sortedIngredients;
};

const makeSubGroupsWithTotals = (list) => {
  let subArrayCounter = 0;
  const listWithTotals = [[]];

  list.reduce((acc, cur, i, arr) => {
    // if the current item is not the same ingredient and measurement as the previous item, push the accumulated total of previous item to final list
    if (
      arr[i - 1] &&
      cur.parsedIngredient.ingredient !==
        arr[i - 1]?.parsedIngredient.ingredient &&
      cur.unit === arr[i - 1]?.unit
    ) {
      const totalIngredient = createTotalString(
        acc[acc.length - 1].parsedIngredient,
      );
      listWithTotals[subArrayCounter].push({ total: totalIngredient });
      listWithTotals.push([]);
      subArrayCounter += 1;
    }

    // if the current item is the same ingredient and measurement as the previous item/previous accumulated total, add the amounts together and set as the new accumulated total
    if (
      cur.parsedIngredient.ingredient ===
        acc[acc.length - 1]?.parsedIngredient.ingredient &&
      cur.unit === acc[acc.length - 1]?.unit
    ) {
      const addedAmounts =
        acc[acc.length - 1].parsedIngredient.quantity +
        cur.parsedIngredient.quantity;

      acc.pop();
      acc.push({
        ...cur,
        parsedIngredient: { ...cur.parsedIngredient, quantity: addedAmounts },
      });
    } else {
      // push the next item to the accumulator if it is different than the one before it
      acc.push(cur);
    }

    // push each item that comes in to the final list
    listWithTotals[subArrayCounter].push({
      id: cur.id,
      ingredient: cur.ingredient,
      isChecked: cur.isChecked,
    });

    if (i === arr.length - 1) {
      const totalIngredient = createTotalString(
        acc[acc.length - 1].parsedIngredient,
      );
      listWithTotals[subArrayCounter].push({ total: totalIngredient });
    }

    return acc;
  }, []);

  return listWithTotals;
};
