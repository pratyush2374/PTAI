// types.ts
export interface Meal {
  id: string;
  type: string;
  name: string;
  category: string[];
  weight: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fibre: number;
  otherNutrients: string;
  ingredients: string[];
  allergens: string | null;
  cookingTime: number;
  recipe: string;
}

export interface DailyStats {
  minutesWorkedOut: number;
  caloriesToBurn: number;
  caloriesToGain: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  fibreGrams: number;
  waterIntake: number | null;
  meals: Meal[];
}