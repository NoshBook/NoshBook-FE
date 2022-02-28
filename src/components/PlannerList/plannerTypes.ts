export interface RecipeType {
  id: number | null;
  name: string | null;
}

export type DayType =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
  | null;

export interface RecipesByDayType {
  day: DayType;
  recipes: RecipeType[];
}
