import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/get-exercise-data", async (req, res) => {
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
    } = req.body;

    const preferredExerciseTypeInString = preferredExerciseType.join(", ");
    const previous7DaysExerciseFocusAreasInString =
        previous7DaysExerciseFocusAreas.join(", ");
        
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
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
        "equipmentRequired": "string (write 'none' if no equipment is required)",
        "exerciseType": "string",
        "totalExercises": "integer",
        "totalApproxCaloriesBurn": "integer",
        "exercises": [
            {
                "exerciseName": "string",
                "exerciseType": "string",
                "primaryMuscleTarget": "string",
                "secondaryMuscleTarget": "string",
                "exerciseDuration": "integer",
                "equipmentRequired": "string (write 'none' if no equipment is required)",
                "calorieBurn": "integer",
                "beginnerSets": "integer",
                "beginnerReps": "integer",
                "intermediateSets": "integer",
                "intermediateReps": "integer",
                "expertSets": "integer",
                "expertReps": "integer",
                "restTime": "integer",
                "adviseWhenDoingExercise": "string"
            }
            ...more exercises above like that based on user activity level and fitness goals
        ]
    }

    The JSON response should strictly follow the above structure and include the appropriate values based on the provided user data.
`;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    const jsonData = result.response.text().match(/```json([\s\S]+?)```/)[1];

    // Parse the JSON data
    const responseJSON = JSON.parse(jsonData);

    res.status(200).send(responseJSON);
});

app.listen(3001, () => {
    console.log("Server is running on port `http://localhost:3001`");
});
