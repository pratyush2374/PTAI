import { GoogleGenerativeAI } from "@google/generative-ai";

const calculateCalories = async (alternate: string) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        Given the following meal:
        - ${alternate}
        Calculate the total calories consumed in this meal.
        I do not care abou the calculation how you calculated it. Just give me the total number of calories.
        GIVE 0 if the meal is invalid like if it has random text like 
        ONLY TOTAL CALORIES NO EXPLANATION, NO OTHER NUMBER JUST TOTAL CALORIES
        `;

        const result = await model.generateContent(prompt);
        if (!result?.response?.text) {
            throw new Error("No response received from the AI model.");
        }

        const calories = result.response.text().match(/\d+/);
        if (!calories) {
            throw new Error("Failed to calculate total calories.");
        }

        const caloriesToSend = parseInt(calories[0]);
        return caloriesToSend;
    } catch (error: any) {
        console.error("Error in generateDietPlan:", error.message || error);
        throw new Error("Failed to generate diet plan. Please try again.");
    }
};

export default calculateCalories;
