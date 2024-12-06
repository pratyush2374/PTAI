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
    dob: z.coerce.date({
        required_error: "Date of birth is required",
        invalid_type_error: "Invalid date of birth",
    }),
    height: z.number().positive("Height must be positive"),
    weight: z.number().positive("Weight must be positive"),
    fitnessGoal: z.string().min(1, "Fitness goal is required"),
    pace: z.string().min(1, "Pace is required"),
    activityLevel: z.string().min(1, "Activity level is required"),
    availableEquipments: z.array(z.string()).optional(),
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    await connectToDB();

    try {
        const {
            fullName,
            userName,
            email,
            password,
            dob,
            height,
            weight,
            fitnessGoal,
            pace,
            activityLevel,
            availableEquipments,
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
            dob,
            age: new Date().getFullYear() - new Date(dob).getFullYear(),
            height,
            weight: [{ date: new Date().toISOString(), weight }],
            fitnessGoal,
            pace,
            activityLevel,
            availableEquipments: availableEquipments || [],
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
}
