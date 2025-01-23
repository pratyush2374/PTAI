import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

interface UserData {
    age: number;
    height: number;
    weight: number;
    gender: string;
    activityLevel: string;
    macronutrientPreferences: string[];
    dietaryPreferences: string[];
    allergies: string[];
    healthProblems: string[];
    fitnessGoals: string[];
    previous7DaysMeals: any[];
}

interface Meal {
    type: "BREAKFAST" | "LUNCH" | "SNACK" | "DINNER";
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

interface DietPlanOutput {
    totalCalories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatsGrams: number;
    fibreGrams: number;
    waterIntake: number;
    numberOfMeals: number;
    specialConsiderations: string;
    meals: Meal[];
}

const generateDietPlan = async (
    userData: UserData
): Promise<DietPlanOutput> => {
    console.log(userData);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    // Define the schema for the diet plan response
    const schema = {
        type: SchemaType.OBJECT,
        properties: {
            totalCalories: { type: SchemaType.NUMBER },
            proteinGrams: { type: SchemaType.NUMBER },
            carbsGrams: { type: SchemaType.NUMBER },
            fatsGrams: { type: SchemaType.NUMBER },
            fibreGrams: { type: SchemaType.NUMBER },
            waterIntake: { type: SchemaType.NUMBER },
            numberOfMeals: { type: SchemaType.NUMBER },
            specialConsiderations: { type: SchemaType.STRING },
            meals: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.OBJECT,
                    properties: {
                        type: {
                            type: SchemaType.STRING,
                            enum: ["BREAKFAST", "LUNCH", "SNACK", "DINNER"],
                        },
                        name: { type: SchemaType.STRING },
                        category: {
                            type: SchemaType.ARRAY,
                            items: { type: SchemaType.STRING },
                        },
                        weight: { type: SchemaType.NUMBER },
                        calories: { type: SchemaType.NUMBER },
                        protein: { type: SchemaType.NUMBER },
                        carbs: { type: SchemaType.NUMBER },
                        fats: { type: SchemaType.NUMBER },
                        fibre: { type: SchemaType.NUMBER },
                        otherNutrients: { type: SchemaType.STRING },
                        ingredients: {
                            type: SchemaType.ARRAY,
                            items: { type: SchemaType.STRING },
                        },
                        allergens: {
                            type: SchemaType.STRING,
                            nullable: true,
                        },
                        cookingTime: { type: SchemaType.NUMBER },
                        recipe: { type: SchemaType.STRING },
                    },
                    required: [
                        "type",
                        "name",
                        "category",
                        "weight",
                        "calories",
                        "protein",
                        "carbs",
                        "fats",
                        "fibre",
                        "otherNutrients",
                        "ingredients",
                        "allergens",
                        "cookingTime",
                        "recipe",
                    ],
                },
            },
        },
        required: [
            "totalCalories",
            "proteinGrams",
            "carbsGrams",
            "fatsGrams",
            "fibreGrams",
            "waterIntake",
            "numberOfMeals",
            "specialConsiderations",
            "meals",
        ],
    };

    // Configure the model
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });

    // Create the prompt
    const prompt = `Generate a personalized diet plan based on the following user data:

    Age: ${userData.age}
    Height: ${userData.height} cm
    Weight: ${userData.weight} kg
    Gender: ${userData.gender}
    Activity Level: ${userData.activityLevel}
    Macronutrient Preferences: ${userData.macronutrientPreferences.join(", ")}
    Dietary Preferences: ${userData.dietaryPreferences.join(", ")}
    Allergies: ${userData.allergies.join(", ")}
    Health Problems: ${userData.healthProblems.join(", ")}
    Fitness Goals: ${userData.fitnessGoals.join(", ")}

    These are the previous 7 days meals of the user: ${userData.previous7DaysMeals.join(", ")} so avoid repeating those meals again in the plan.

    Special Dietary Considerations:
    1. If "Strict Vegetarian" is present, ONLY use vegetarian protein sources like tofu, legumes, nuts, and seeds.
    2. If "Vegan" is present, exclude ALL animal products including dairy and eggs.
    3. For "High Protein", prioritize protein-rich ingredients.
    4. For "Low Carb", minimize carbohydrate-heavy foods.
    5. For "Keto", focus on high-fat, low-carb options.
    6. For "Gluten Free", avoid wheat and gluten-containing grains.
    7. If "Jain" then include a pure Jainism diet.
    8. If "No pork" and "No egg" then strictly don't include them in the diet 
    Customize the meal plan to align with these specific macronutrient and dietary preferences.

    Give only 4 meals for the day !
    `;

    // Generate the diet plan
    const result = await model.generateContent(prompt);
    const dietPlanData = JSON.parse(result.response.text());

    return dietPlanData;
};

export default generateDietPlan;
