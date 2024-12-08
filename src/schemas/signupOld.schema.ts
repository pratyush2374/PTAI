import { z } from "zod";

const signupSchema = z.object({
    // For User model
    fullName: z.string().min(1, "Full name is required"),
    userName: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    age: z.number().positive("Age must be positive"),
    gender: z
        .enum(["male", "female", "other"])
        .refine((value) => ["male", "female", "other"].includes(value), {
            message: "Invalid gender",
        }),
    height: z.number().positive("Height must be positive"),
    weight: z.number().positive("Weight must be positive"),

    // For UserPreferences model
    activityLevel: z.string().min(1, "Activity level is required"),
    preferredExerciseType: z.array(z.string()).optional(), // Cardio, Strength training, Yoga, etc.
    exerciseExperience: z
        .enum(["beginner", "intermediate", "advanced"])
        .refine(
            (value) => ["beginner", "intermediate", "advanced"].includes(value),
            {
                message: "Invalid experience level",
            }
        ),
    workoutDuration: z.string().min(1, "Workout duration is required"),
    exerciseFrequency: z.string().min(1, "Exercise frequency is required"),
    macronutrientPreferences: z.array(z.string()).optional(),
    fitnessGoal: z.array(z.string()).optional(),
    pace: z.string().min(1, "Pace is required"),
    availableEquipments: z.array(z.string()).optional(),

    // For HealthAndDietary model
    dietaryPreferences: z.array(z.string()).optional(),
    healthProblems: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
});

export default signupSchema;
