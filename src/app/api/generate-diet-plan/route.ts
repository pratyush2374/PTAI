import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";
import connectToDB from "@/lib/dbConnection";
import User from "@/models/user.model";
import Diet from "@/models/diet.model";
import DailyDiet from "@/models/dailyDiet.model";
import generateDietPlan from "@/core/generateDietPlan";

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await connectToDB();

    // Authenticate user
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find user and populate necessary references
    const user = await User.findById(token.sub)
      .populate('preferences')
      .populate('healthAndDietary')
      .lean(); // Use lean for performance

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove unwanted populated fields
    const { dietId, exerciseId, userStats, ...userForDietPlan } = user;

    // Generate diet plan
    const dietPlanResult = await generateDietPlan(userForDietPlan);

    // Store diets from the generated plan
    const diets = await Promise.all(dietPlanResult.meals.map(async (meal : any) => {
      const dietDoc = new Diet({
        name: meal.name,
        category: meal.category,
        weight: meal.weight,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
        fibre: meal.fibre,
        otherMacroNutrients: meal.otherMacroNutrients,
        keyIngredients: meal.keyIngredients,
        commonAllergens: meal.commonAllergens,
        cookingTime: meal.cookingTime,
        recipe: meal.recipe
      });
      return await dietDoc.save();
    }));

    // Create daily diet entry
    const dailyDiet = new DailyDiet({
      userId: user._id,
      date: new Date(),
      meals: {
        breakfast: diets.filter(diet => diet.category.includes('breakfast')).map(diet => diet._id),
        lunch: diets.filter(diet => diet.category.includes('lunch')).map(diet => diet._id),
        snacks: diets.filter(diet => diet.category.includes('snacks')).map(diet => diet._id),
        dinner: diets.filter(diet => diet.category.includes('dinner')).map(diet => diet._id)
      }
    });

    await dailyDiet.save();

    return NextResponse.json({
      message: 'Diet plan generated successfully',
      dietPlan: dietPlanResult,
      dailyDietId: dailyDiet._id
    });

  } catch (error) {
    console.error('Diet plan generation error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate diet plan', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}


/*
sample doc format for generateDietPlan method

{
    meals: [
      {
        name: string,              // e.g., "Quinoa Breakfast Bowl"
        category: string[],         // e.g., ["breakfast", "vegetarian"]
        weight: number,             // in grams
        calories: number,
        protein: number,
        carbs: number,
        fats: number,
        fibre: number,
        otherMacroNutrients: string, // e.g., "Vitamin B12, Magnesium"
        keyIngredients: string[],   // e.g., ["quinoa", "spinach", "eggs"]
        commonAllergens?: string,   // optional, e.g., "eggs, milk"
        cookingTime: number,        // in minutes
        recipe: string              // cooking instructions
      },
      // Similar objects for lunch, snacks, dinner
    ]
  }

*/