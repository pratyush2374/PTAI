import { GoogleGenerativeAI } from "@google/generative-ai";

const giveOverviewOfBloodPressure = async (data: any) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Given the following data:
            - ${data}
            Give me a 100 word overview of the blood pressure data
        `;

        const result = await model.generateContent(prompt);
        if (!result?.response?.text) {
            throw new Error("No response received from the AI model.");
        }

        return result.response.text();
    } catch (error: any) {
        console.error("Error in generateDietPlan:", error.message || error);
        throw new Error("Failed to generate diet plan. Please try again.");
    }
};

export default giveOverviewOfBloodPressure;
