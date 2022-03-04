import { parse } from 'recipe-ingredient-parser-v3';

export default function addTotals(list) {
  if (!list?.length) return [];

  const sortedAndCleanedUpList = prepareList(list);

  const listWithTotals = makeSubGroupsWithTotals(sortedAndCleanedUpList);

  const sortedListWithTotals = listWithTotals.map((subArr) =>
    sortByChecked(subArr),
  );

  return sortedListWithTotals;
}

const prepareList = (list) => {
  //remove items from the list that aren't ingredients
  if (!list?.length) return [];
  const removeBadIngredRegex = new RegExp(/^For the */, 'i');
  const filteredList = list.filter(
    (item) => !removeBadIngredRegex.test(item.ingredient),
  );

  const parsedList = filteredList.map((item) => {
    // clean up and parse each ingredient into quantity, unit of measure, and ingredient name
    const preParsed = preParseCleanUp(item.ingredient);
    const parsed = parseIngredient(preParsed);
    const postParsed = postParseCleanUp(parsed.ingredient);
    const parsedIngredient = { ...parsed, ingredient: postParsed };

    return { ...item, parsedIngredient };
  });

  const sortedList = sortIngredientsAlphabetically(parsedList);
  return sortedList;
};

const createTotalString = ({ quantity, unit, unitPlural, ingredient }) => {
  // determine if it should be just the ingredient, number of ingredient, or number of units of ingredient
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

  // clean up pieces/pound unit confusion from ingredient parser library
  const piecesPoundRegex = new RegExp(/pieces pound/);
  if (piecesPoundRegex.test(ingredientString)) {
    ingredientString = ingredientString.replace(piecesPoundRegex, 'pound');
  }

  return `Total: ${ingredientString}`;
};

const parseIngredient = (ingredient) => {
  // fix issue with double ts while using recipe parser library
  const doubleTregex = new RegExp('tt');
  const hasDoubleTs = doubleTregex.test(ingredient);
  const originalWord = ingredient
    .split(' ')
    .find((item) => doubleTregex.test(item));
  if (hasDoubleTs) {
    ingredient = ingredient.replace(doubleTregex, 't');
  }

  let parsed = parse(ingredient, 'eng');

  // insert the word that had double Ts back into the string after parsing
  if (hasDoubleTs) {
    const parsedTemp = { ...parsed };
    const wordToChange = originalWord.replace(doubleTregex, 't');

    parsed = {
      ...parsedTemp,
      ingredient: parsedTemp.ingredient.replace(wordToChange, originalWord),
    };
  }

  return parsed;
};

const preParseCleanUp = (ingredient) => {
  let ingred = ingredient;
  const regexBadWords = [
    /\(optional\)/,
    /\((optiaonal)\)/,
    /\(fresh or frozen\)/,
    /\(such as grapeseed oil, sunflower oil or vegetable oil\)/,
    /\(about 10 ¼ inch thick slices\)/,
    /\(about * thick slices\)/,
    /, diced/,
    /, chopped/,
    /, minced\/grated/,
    /boneless skinless/,
    /boneless and skinless/,
    /For the queso/,
    /For the balsamic marinade\//,
    /large/,
    /or minced/,
  ];

  regexBadWords.forEach((word) => {
    ingred = ingred.replace(word, '');
  });
  return ingred;
};

// remove units that were left on the ingredient name string and anything after the last comma
const postParseCleanUp = (ingredient) => {
  const badWords = ['tablespoon', 'teaspoon', 'ounce', 'ounces'];
  let ingred = ingredient;
  if (ingred.includes(',') && ingred[ingred.length - 1] !== ')') {
    const commaSplit = ingred.split(',');

    commaSplit.pop();

    ingred = commaSplit.join(' ');
  }

  const spaceSplit = ingred.split(' ');
  const finalString = spaceSplit.filter((item) => !badWords.includes(item));

  return finalString.join(' ').trim();
};

const sortIngredientsAlphabetically = (list) => {
  const compareIngredients = (a, b) => {
    const firstIngredient = a.parsedIngredient.ingredient.toLowerCase();
    const secondIngredient = b.parsedIngredient.ingredient.toLowerCase();
    if (firstIngredient > secondIngredient) return 1;
    if (firstIngredient < secondIngredient) return -1;
    return 0;
  };
  const sortedIngredients = list.sort(compareIngredients);
  return sortedIngredients;
};

// sort ingredients that are checked to the bottom of each subarray
const sortByChecked = (list) => {
  const compareIngredients = (a, b) => {
    if (a.isChecked > b.isChecked) return 1;
    if (a.isChecked < b.isChecked) return -1;
    return 0;
  };
  const sortedIngredients = list.sort(compareIngredients);
  return sortedIngredients;
};

// break the list out into similar ingredients and make totals for each group of ingredients
const makeSubGroupsWithTotals = (list) => {
  let subArrayCounter = 0;
  const listWithTotals = [[]];

  list.reduce((acc, cur, i, arr) => {
    const currentIngredient = cur.parsedIngredient.ingredient;
    const currentUnit = cur.parsedIngredient.unit;
    const previousIngredientIfExists = arr[i - 1]?.parsedIngredient.ingredient;
    const previousUnitIfExists = arr[i - 1]?.parsedIngredient.unit;
    const accumulatedIngredient =
      acc[acc.length - 1]?.parsedIngredient.ingredient;
    const accumulatedUnit = acc[acc.length - 1]?.parsedIngredient.unit;

    const curIngredNotSameAsPrev =
      arr[i - 1] && currentIngredient !== previousIngredientIfExists;

    const curIngredSameButDiffUnit =
      arr[i - 1] &&
      currentIngredient === previousIngredientIfExists &&
      currentUnit !== previousUnitIfExists;

    // if the current item is not the same ingredient and measurement as the previous item or the ingredients are the same, but not the units, push the accumulated total of previous item to final list and create a new subarray
    if (curIngredNotSameAsPrev || curIngredSameButDiffUnit) {
      const totalIngredient = createTotalString(
        acc[acc.length - 1].parsedIngredient,
      );
      listWithTotals[subArrayCounter].push({ total: totalIngredient });
      listWithTotals.push([]);
      subArrayCounter += 1;
    }

    const curIngredSameAsPrev = currentIngredient === accumulatedIngredient;
    const unitsAreSame = currentUnit === accumulatedUnit;

    // if the current item is the same ingredient and measurement as the previous item/previous accumulated total, add the amounts together and set as the new accumulated total
    if (
      acc[acc.length - 1]?.parsedIngredient.quantity &&
      curIngredSameAsPrev &&
      unitsAreSame
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

    // push each item that comes in to the final list (must have id, ingredient, and isChecked properties)
    listWithTotals[subArrayCounter].push({
      id: cur.id,
      ingredient: cur.ingredient,
      isChecked: cur.isChecked,
    });

    // push the last total on at the end
    const lastIndex = i === arr.length - 1;
    if (lastIndex) {
      const totalIngredient = createTotalString(
        acc[acc.length - 1].parsedIngredient,
      );
      listWithTotals[subArrayCounter].push({ total: totalIngredient });
    }

    return acc;
  }, []);

  return listWithTotals;
};
