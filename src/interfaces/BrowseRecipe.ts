export interface BrowseRecipe {
  description: string;
  id: string;
  image: string;
  ingredients: Array<string>;
  instructions: Array<string>;
  name: string;
  rating: number;
  servings: string;
  tags: Array<string>;
  totalTime: string;
}
