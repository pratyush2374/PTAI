import { GoogleGenerativeAI } from "@google/generative-ai";

const generateDietPlan = async (userData: any) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        Given the following user data:
        
        - Age: ${userData.age}
        - Height: ${userData.height} cm
        - Weight: ${userData.weight} kg
        - Gender: ${userData.gender}
        - Activity Level: ${userData.activityLevel}
        - Macronutrient Preferences: ${userData.macronutrientPreferences.join(
            ", "
        )}
        - Dietary Preferences: ${userData.dietaryPreferences.join(", ")}
        - Allergies: ${userData.allergies.join(", ")}
        - Health Problems: ${userData.healthProblems.join(", ")}
        - Fitness Goals: ${userData.fitnessGoals.join(", ")}
        - Previous 7 Days Meals: ${userData.previous7DaysMeals.join(", ")}
        
        Generate a strict JSON response following this exact format for a daily meal plan. The response MUST be valid JSON with no markdown formatting:
        Give indian meals and cuisine preferably
        If you don't give the data in the format that i am asking for then it will cause an api issue giving 500 error and thus causing bad user experience and loss of money as well so please give me the data in very very very very very very strict format as i have asked you PLEASE
        {
            "totalCalories": "integer",
            "proteinGrams": "integer",
            "carbsGrams": "integer",
            "fatsGrams": "integer",
            "fibreGrams": "integer",
            "waterIntake": "integer (in ml)",
            "numberOfMeals": "integer",
            "specialConsiderations": "string",
            "meals": [
                {
                    "type": "BREAKFAST | LUNCH | SNACK | DINNER",
                    "name": "string",
                    "category": "array of strings",
                    "weight": "float (in grams)",
                    "calories": "integer",
                    "protein": "float",
                    "carbs": "float",
                    "fats": "float",
                    "fibre": "float",
                    "otherNutrients": "string (comma-separated key nutrients)",
                    "ingredients": "array of strings",
                    "allergens": "string (or null if none)",
                    "cookingTime": "integer (in minutes)",
                    "recipe": "string (detailed step-by-step instructions)"
                }
                ...more meals based on numberOfMeals
            ]
        }

        IMPORTANT RULES:
        1. All number fields must be specific values (calories, nutrients, etc.)
        2. Meals must be balanced and spread throughout the day
        3. The response must be pure JSON with no markdown
        4. Consider user's allergies and dietary preferences strictly
        5. Provide detailed, actionable recipes
        6. Respect the user's macronutrient preferences
        7. Account for health problems in meal selection
        8. Generate total 4 meals only for the day and consider the user's fitness goals 
        If you don't give the data in the format that i am asking for then it will cause an api issue giving 500 error and thus causing bad user experience and loss of money as well so please give me the data in very very very very very very strict format as i have asked you PLEASE
        `;

        const result = await model.generateContent(prompt);
        if (!result?.response?.text) {
            throw new Error("No response received from the AI model.");
        }

        const jsonMatch = result.response.text().match(/```json([\s\S]+?)```/);
        if (!jsonMatch) {
            throw new Error("Failed to parse JSON from response.");
        }

        return JSON.parse(jsonMatch[1]);
    } catch (error: any) {
        console.error("Error in generateDietPlan:", error.message || error);
        throw new Error("Failed to generate diet plan. Please try again.");
    }
};

export default generateDietPlan;
