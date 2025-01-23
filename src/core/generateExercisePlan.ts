import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

interface UserData {
    age: number;
    height: number;
    weight: number;
    gender: string;
    activityLevel: string;
    preferredExerciseType: string[];
    exerciseExperience: string;
    workoutDuration: string;
    exerciseFrequency: string;
    fitnessGoals: string[];
    pace: string;
    availableEquipments: string[];
    healthProblems: string[];
    previous7DaysExerciseFocusAreas: string[];
}

interface Exercise {
    exerciseName: string;
    exerciseType: string[];
    primaryMuscleTarget: string;
    secondaryMuscleTarget: string;
    exerciseDuration: number;
    equipmentRequired: string[];
    calorieBurn: number;
    sets: number;
    reps: number;
    restTime: number;
    adviseWhenDoingExercise: string;
}

interface ExercisePlanOutput {
    focusArea: string;
    approxDurationToCompleteinMinutes: number;
    equipmentRequired: string[];
    exerciseType: string[];
    totalExercises: number;
    totalApproxCaloriesBurn: number;
    difficultyLevel: string;
    exercises: Exercise[];
}

const generateExercisePlan = async (
    userData: UserData
): Promise<ExercisePlanOutput> => {
    console.log(userData);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    // Define the schema for the exercise plan response
    const schema = {
        type: SchemaType.OBJECT,
        properties: {
            focusArea: { type: SchemaType.STRING },
            approxDurationToCompleteinMinutes: { type: SchemaType.NUMBER },
            equipmentRequired: { 
                type: SchemaType.ARRAY, 
                items: { type: SchemaType.STRING } 
            },
            exerciseType: { 
                type: SchemaType.ARRAY, 
                items: { type: SchemaType.STRING } 
            },
            totalExercises: { type: SchemaType.NUMBER },
            totalApproxCaloriesBurn: { type: SchemaType.NUMBER },
            difficultyLevel: { type: SchemaType.STRING },
            exercises: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.OBJECT,
                    properties: {
                        exerciseName: { type: SchemaType.STRING },
                        exerciseType: { 
                            type: SchemaType.ARRAY, 
                            items: { type: SchemaType.STRING } 
                        },
                        primaryMuscleTarget: { type: SchemaType.STRING },
                        secondaryMuscleTarget: { type: SchemaType.STRING },
                        exerciseDuration: { type: SchemaType.NUMBER },
                        equipmentRequired: { 
                            type: SchemaType.ARRAY, 
                            items: { type: SchemaType.STRING } 
                        },
                        calorieBurn: { type: SchemaType.NUMBER },
                        sets: { type: SchemaType.NUMBER },
                        reps: { type: SchemaType.NUMBER },
                        restTime: { type: SchemaType.NUMBER },
                        adviseWhenDoingExercise: { type: SchemaType.STRING },
                    },
                    required: [
                        "exerciseName", "exerciseType", "primaryMuscleTarget", 
                        "secondaryMuscleTarget", "exerciseDuration", 
                        "equipmentRequired", "calorieBurn", "sets", 
                        "reps", "restTime", "adviseWhenDoingExercise"
                    ]
                }
            }
        },
        required: [
            "focusArea", "approxDurationToCompleteinMinutes", 
            "equipmentRequired", "exerciseType", "totalExercises", 
            "totalApproxCaloriesBurn", "difficultyLevel", "exercises"
        ]
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
    const prompt = `Generate a personalized exercise plan based on the following user data:
    
    Age: ${userData.age}
    Height: ${userData.height} cm
    Weight: ${userData.weight} kg
    Gender: ${userData.gender}
    Activity Level: ${userData.activityLevel}
    Preferred Exercise Type(s): ${userData.preferredExerciseType.join(", ")}
    Exercise Experience: ${userData.exerciseExperience}
    Workout Duration: ${userData.workoutDuration} minutes
    Exercise Frequency: ${userData.exerciseFrequency} days/week
    Fitness Goals: ${userData.fitnessGoals.join(", ")}
    Pace: ${userData.pace}
    Available Equipment: ${userData.availableEquipments.join(", ")}
    Health Problems: ${userData.healthProblems.join(", ")}
    Previous 7 Days Exercise Focus Areas: ${userData.previous7DaysExerciseFocusAreas.join(", ")}
    
    Please provide a detailed exercise plan that meets these specifications.`;

    // Generate the exercise plan
    const result = await model.generateContent(prompt);
    const exercisePlanData = JSON.parse(result.response.text());

    return exercisePlanData;
};

export default generateExercisePlan;