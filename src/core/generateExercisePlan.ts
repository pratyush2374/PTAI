import { GoogleGenerativeAI } from "@google/generative-ai";

const generateExercisePlan = async (userData: any) => {
    try {
        const {
            age,
            height,
            weight,
            gender,
            activityLevel,
            preferredExerciseType,
            exerciseExperience,
            workoutDuration,
            exerciseFrequency,
            fitnessGoals,
            pace,
            availableEquipments,
            healthProblems,
            previous7DaysExerciseFocusAreas,
        } = userData;

        const preferredExerciseTypeInString = preferredExerciseType.join(", ");
        const previous7DaysExerciseFocusAreasInString =
            previous7DaysExerciseFocusAreas.join(", ");

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Given the following user data:
  
      - Age: ${age}
      - Height: ${height} cm
      - Weight: ${weight} kg
      - Gender: ${gender}
      - Activity Level: ${activityLevel}
      - Preferred Exercise Type(s): ${preferredExerciseTypeInString}
      - Exercise Experience: ${exerciseExperience}
      - Workout Duration: ${workoutDuration} minutes
      - Exercise Frequency: ${exerciseFrequency} days/week
      - Fitness Goals: ${fitnessGoals}
      - Pace: ${pace}
      - Available Equipments: ${availableEquipments}
      - Health Problems: ${healthProblems}
      - Previous 7 Days Exercise Focus Areas: ${previous7DaysExerciseFocusAreasInString}
  
      I would like you to generate a JSON output based on the following template and match the user's preferences and requirements. The output should be a valid and strict JSON format.
  
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
                  "equipmentRequired": "string (write 'none' if no equipment is required)",
                  "calorieBurn": "integer",
                  "sets": "integer",
                  "reps": "integer", (reps means how many times you have to do the exercise per set integer not string)
                  "restTime": "integer",
                  "adviseWhenDoingExercise": "string"
              }
              ...more exercises above like that based on user activity level and fitness goals
          ]
      }
  
      The JSON response should strictly follow the above structure and include the appropriate values based on the provided user data.
  `;

        const result = await model.generateContent(prompt);
        if (!result?.response?.text) {
            throw new Error(
                "No response text received from the generative AI model."
            );
        }

        console.log("Exercise Data received");

        const jsonMatch = result.response.text().match(/```json([\s\S]+?)```/);
        if (!jsonMatch) {
            throw new Error("Failed to parse JSON from the model response.");
        }

        const jsonData = jsonMatch[1];
        const responseJSON = JSON.parse(jsonData);
        return responseJSON;
    } catch (error: any) {
        console.error("Error in generateExercisePlan:", error.message || error);
        throw new Error(
            "An error occurred while generating the exercise plan. Please check your input and try again."
        );
    }
};

export default generateExercisePlan;
