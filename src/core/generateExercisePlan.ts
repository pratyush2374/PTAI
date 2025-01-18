import { GoogleGenerativeAI } from "@google/generative-ai";

const generateExercisePlan = async (userData: any) => {
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
        - Preferred Exercise Type(s): ${userData.preferredExerciseType.join(
            ", "
        )}
        - Exercise Experience: ${userData.exerciseExperience}
        - Workout Duration: ${userData.workoutDuration} minutes
        - Exercise Frequency: ${userData.exerciseFrequency} days/week
        - Fitness Goals: ${userData.fitnessGoals.join(", ")}
        - Pace: ${userData.pace}
        - Available Equipment: ${userData.availableEquipments.join(", ")}
        - Health Problems: ${userData.healthProblems.join(", ")}
        - Previous 7 Days Exercise Focus Areas: ${userData.previous7DaysExerciseFocusAreas.join(
            ", "
        )}
        
        I would like you to generate a JSON output based on the following template and match the user's preferences and requirements. The output should be a valid and strict JSON format.
        Generate a strict JSON response following this exact format. The response MUST be valid JSON with no markdown formatting:
        If you don't give the data in the format that i am asking for then it will cause an api issue giving 500 error and thus causing bad user experience and loss of money as well so please give me the data in very very very very very very strict format as i have asked you PLEASE
        
         Expected output format:
  
        {
            "focusArea": "string",
            "approxDurationToCompleteinMinutes": "integer",
            "equipmentRequired": "array of strings (give empty array if no equipment is required)",
            "exerciseType": "array of string" (give empty array if no equipment is required),
            "totalExercises": "integer",
            "totalApproxCaloriesBurn": "integer",
            "difficultyLevel": "string",
            "exercises": [
                {
                    "exerciseName": "string",
                    "exerciseType": "array of string ", 
                    "primaryMuscleTarget": "string",
                    "secondaryMuscleTarget": "string",
                    "exerciseDuration": "integer",
                    "equipmentRequired": "array of strings (give empty array if no equipment is required)",
                    "calorieBurn": "integer",
                    "sets": "integer",
                    "reps": "string", (reps means how many times you have to do the exercise per set )
                    "restTime": "integer",
                    "adviseWhenDoingExercise": "string"
                }
                ...more exercises above like that based on user activity level and fitness goals
            ]
        }
        
        Writing "As many as possible" is banned in this prompt.
        The JSON response should strictly follow the above structure and include the appropriate values based on the provided user data. Please follow the above format strictly, as i'll parse your response as JSON.parse() so that it should not give any error you give me in JSON format so that it is easy for me to parse.

        IMPORTANT RULES:
        1. All number fields (reps, sets, duration, etc.) must be integers, not strings
        2. Never use phrases like "As many as possible" - always provide specific numbers
        3. The response must be pure JSON with no markdown or code blocks
        4. Equipment arrays should be empty ([]) if no equipment is needed
        5. All string values must be specific and actionable
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

        const str1 = jsonMatch[1].replace(
            /as many as possible/gi,
            `"As many as possible"`
        );
        return JSON.parse(jsonMatch[1]);
    } catch (error: any) {
        console.error("Error in generateExercisePlan:", error.message || error);
        throw new Error("Failed to generate exercise plan. Please try again.");
    }
};

export default generateExercisePlan;
