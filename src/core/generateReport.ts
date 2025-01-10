import { GoogleGenerativeAI } from "@google/generative-ai";

interface UserInfo {
    fullName: string;
    age: number;
    gender: string;
    height: number;
    activityLevel?: string;
    fitnessGoals?: string[];
    healthProblems?: string[];
}

const formatUserInfo = (userData: any): UserInfo => {
    return {
        fullName: userData.fullName,
        age: userData.age,
        gender: userData.gender,
        height: userData.height,
        activityLevel: userData.preferences?.activityLevel,
        fitnessGoals: userData.preferences?.fitnessGoals,
        healthProblems: userData.healthAndDietary?.healthProblems
    };
};

const generateReport = async (which: string, data: any, userData: any) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const formattedUserInfo = formatUserInfo(userData);

        const prompt = `
            As a health analytics expert, analyze the following ${which} data for ${formattedUserInfo.fullName}:
            Give me suggestions based on the user's age, gender, height, activity level, fitness goals, and health conditions so that he can have no problems in ${which} in future

            User Profile:
            - Age: ${formattedUserInfo.age}
            - Gender: ${formattedUserInfo.gender}
            - Height: ${formattedUserInfo.height}cm
            - Activity Level: ${formattedUserInfo.activityLevel}
            - Fitness Goals: ${formattedUserInfo.fitnessGoals?.join(', ')}
            - Health Conditions: ${formattedUserInfo.healthProblems?.join(', ')}

            Raw Data:
            ${JSON.stringify(data)}

            Please provide a 100-150 word summary analyzing this ${which} data. Include:
            1. Key patterns or trends
            2. Any concerning values or improvements
            3. Recommendations based on the user's profile and goals
            4. Potential correlations with their activity level or fitness goals

            Format the response as a cohesive paragraph without bullet points or sections.
            Also dont say sentences simlar to Without any xxxx data provided like that just say what you think based on the raw data that i have given to you please
            Dont start with a negative setting no data provided bla bla ...just day what you think a general overview on the data and on the date
            The main aim is to suggest user a lifestyle that what should he do to improve his health please dont blame on the data of the data is insufficient just give a general overview to increase the user's health based on the topic that i have given to you
        `;

        const result = await model.generateContent(prompt);
        
        if (!result?.response?.text) {
            throw new Error("No response received from the AI model.");
        }
        
        return result.response.text();
    } catch (error: any) {
        console.error("Error in generateReport:", error.message || error);
        throw new Error(`Failed to generate ${which} report. Please try again.`);
    }
};

export default generateReport;