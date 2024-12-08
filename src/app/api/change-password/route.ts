import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import connectToDB from "@/lib/dbConnection";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { oldPassword, newPassword } = req.body;

    // Check if the user is logged in using next-auth session
    const session = await getSession({ req });
    if (!session) {
        return res
            .status(401)
            .json({ message: "You must be logged in to change your password" });
    }

    const userId = session.user._id; // Get the userId from the session

    // Validate required fields
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Connect to the database
        await connectToDB();

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the old password is correct
        const isPasswordCorrect = await bcrypt.compare(
            oldPassword,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect old password" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password with the new hashed password
        user.password = hashedPassword;
        await user.save();

        return res
            .status(200)
            .json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
