import { z } from "zod";

const signupSchema = z.object({
    // User Basic Information
    fullName: z
        .string()
        .trim()
        .min(2, { message: "Full name must be at least 2 characters" })
        .max(50, { message: "Full name cannot exceed 50 characters" })
        .regex(/^[A-Za-z\s'-]+$/, {
            message:
                "Full name can only contain letters, spaces, hyphens, and apostrophes",
        }),

    userName: z
        .string()
        .trim()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username cannot exceed 20 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message:
                "Username can only contain letters, numbers, and underscores",
        })
        .refine(
            (val) => !["admin", "root", "system"].includes(val.toLowerCase()),
            {
                message: "This username is not allowed",
            }
        ),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email({ message: "Invalid email address" })
        .refine(
            (val) => {
                const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(val);
            },
            { message: "Email format is invalid" }
        ),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(64, { message: "Password cannot exceed 64 characters" })
        .refine(
            (val) => {
                const passwordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return passwordRegex.test(val);
            },
            {
                message:
                    "Password must include uppercase, lowercase, number, and special character",
            }
        ),

    // Personal Details
    age: z
        .number()
        .int({ message: "Age must be a whole number" })
        .min(13, { message: "You must be at least 13 years old" })
        .max(120, { message: "Age cannot exceed 120 years" }),

    gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Invalid gender selection" }),
    }),

    height: z
        .number()
        .positive({ message: "Height must be a positive number" })
        .min(50, { message: "Height is too low" })
        .max(300, { message: "Height is too high" }),

    weight: z
        .number()
        .positive({ message: "Weight must be a positive number" })
        .min(20, { message: "Weight is too low" })
        .max(600, { message: "Weight is too high" }),

    // User Preferences
    activityLevel: z.enum(
        ["sedentary", "light", "moderate", "active", "very_active"],
        {
            errorMap: () => ({ message: "Invalid activity level" }),
        }
    ),

    preferredExerciseType: z
        .array(
            z.enum([
                "cardio",
                "strength",
                "yoga",
                "pilates",
                "swimming",
                "running",
                "cycling",
            ])
        )
        .optional(),

    exerciseExperience: z.enum(["beginner", "intermediate", "advanced"], {
        errorMap: () => ({ message: "Invalid exercise experience level" }),
    }),

    workoutDuration: z.enum(["15-30", "30-45", "45-60", "60+"], {
        errorMap: () => ({ message: "Invalid workout duration" }),
    }),

    exerciseFrequency: z.enum(["1-2", "3-4", "5-6", "daily"], {
        errorMap: () => ({ message: "Invalid exercise frequency" }),
    }),

    macronutrientPreferences: z
        .array(z.enum(["high_protein", "high_carb", "high_fat", "balanced"]))
        .optional(),

    fitnessGoal: z
        .array(
            z.enum([
                "weight_loss",
                "muscle_gain",
                "endurance",
                "flexibility",
                "overall_fitness",
            ])
        )
        .optional(),

    pace: z.enum(["slow", "moderate", "fast"], {
        errorMap: () => ({ message: "Invalid pace selection" }),
    }),

    availableEquipments: z
        .array(
            z.enum([
                "dumbbells",
                "resistance_bands",
                "kettlebell",
                "yoga_mat",
                "none",
            ])
        )
        .optional(),

    // Health and Dietary
    dietaryPreferences: z
        .array(
            z.enum([
                "vegetarian",
                "vegan",
                "keto",
                "paleo",
                "gluten_free",
                "none",
            ])
        )
        .optional(),

    healthProblems: z
        .array(z.string())
        .optional()
        .transform((arr) => arr?.filter((item) => item.trim().length > 0)),

    allergies: z
        .array(z.string())
        .optional()
        .transform((arr) => arr?.filter((item) => item.trim().length > 0)),
});

// Create a type for the schema
export type SignupData = z.infer<typeof signupSchema>;

export default signupSchema;
