import { z } from "zod";

const preferencesSchema = z.object({
    activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
    preferredExerciseType: z.array(z.string()).optional(),
    exerciseExperience: z.enum(["beginner", "intermediate", "advanced"]),
    workoutDuration: z.enum(["15-30", "30-45", "45-60", "60+"]),
    exerciseFrequency: z.enum(["1-2", "3-4", "5-6", "daily"]),
    macronutrientPreferences: z.array(z.string()).optional(),
    fitnessGoals: z.array(z.enum([
        "weight_loss", 
        "muscle_gain", 
        "endurance", 
        "flexibility", 
        "overall_fitness"
    ])).optional(),
    pace: z.enum(["slow", "moderate", "fast"]),
    availableEquipments: z.array(z.string()).optional(),
});

export default preferencesSchema;