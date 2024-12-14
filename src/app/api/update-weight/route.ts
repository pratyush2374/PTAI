import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import connectToDB from "@/lib/dbConnection";
import User from "@/models/user.model";
import Weight from "@/models/weight.model";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { weight, date } = req.body;

    // Check if the user is logged in using next-auth session
    const session = await getSession({ req });
    if (!session) {
        return res
            .status(401)
            .json({ message: "You must be logged in to update weight" });
    }

    const userId = session.user._id; // Get the userId from the session

    // Validate required fields
    if (!weight || !date) {
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

        // Create a new weight entry
        const newWeight = {
            date,
            weight,
        };

        // Save the new weight entry to the user's record
        user.weight.push(newWeight);

        // Save the updated user document
        await user.save();

        return res
            .status(200)
            .json({
                message: "Weight updated successfully",
                weight: newWeight,
            });
    } catch (error) {
        console.error("Error updating weight:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
