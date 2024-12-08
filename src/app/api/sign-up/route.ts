import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user.model";
import connectToDB from "@/lib/dbConnection";
import bcrypt from "bcryptjs";
import { z } from "zod";

const signupSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    userName: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    height: z.number().positive("Height must be positive"),
    weight: z.number().positive("Weight must be positive"),
    age : z.number().positive("Age must be positive"),
    gender: z
        .enum(["male", "female", "other"])
        .refine((value) => ["male", "female", "other"].includes(value), {
            message: "Invalid gender",
        }),
    fitnessGoal: z.string().min(1, "Fitness goal is required"),
    pace: z.string().min(1, "Pace is required"),
    activityLevel: z.string().min(1, "Activity level is required"),
    availableEquipments: z.array(z.string()).optional(),
    exerciseExperience: z
        .enum(["beginner", "intermediate", "advanced"])
        .refine(
            (value) => ["beginner", "intermediate", "advanced"].includes(value),
            {
                message: "Invalid experience level",
            }
        ),
    preferredExerciseType: z.array(z.string()).optional(), // Cardio, Strength training, Yoga, etc.
    preferredWorkoutDuration: z.string().optional(), // e.g., "30 minutes", "1 hour"
    exerciseFrequency: z.string().optional(), // e.g., "3 times a week"
    macronutrientPreferences: z.array(z.string()).optional(), // High protein, Balanced, Low carb, etc.
    dietaryPreferences: z.array(z.string()).optional(), // e.g., "Vegetarian", "Vegan", etc.
    healthProblems: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
});

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDB();

    try {
        const {
            fullName,
            userName,
            email,
            password,
            height,
            weight,
            age,
            gender,
            fitnessGoal,
            pace,
            activityLevel,
            availableEquipments,
            exerciseExperience,
            preferredExerciseType,
            preferredWorkoutDuration,
            exerciseFrequency,
            macronutrientPreferences,
            dietaryPreferences,
            healthProblems,
            allergies,
        } = signupSchema.parse(req.body);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
            age,
            height,
            weight: [{ date: new Date().toISOString(), weight }],
            gender,
            fitnessGoal,
            pace,
            activityLevel,
            availableEquipments: availableEquipments || [],
            exerciseExperience,
            preferredExerciseType: preferredExerciseType || [],
            preferredWorkoutDuration,
            exerciseFrequency,
            macronutrientPreferences: macronutrientPreferences || [],
            dietaryPreferences: dietaryPreferences || [],
            healthProblems: healthProblems || [],
            allergies: allergies || [],
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registration successful",
        });
    } catch (error) {
        console.error("Error registering user: ", error);

        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ success: false, message: error.errors });
        }

        return res.status(500).json({
            success: false,
            message: "Error registering user",
        });
    }
};
