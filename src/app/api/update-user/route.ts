// import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import connectToDB from "@/lib/dbConnection";
// import User from "@/models/user.model";

// export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { userId, fullName, userName, profilePic, age, height } = req.body;

//     // Check if the user is logged in using next-auth session
//     const session = await getSession({ req });
//     if (!session) {
//         return res
//             .status(401)
//             .json({ message: "You must be logged in to update your details" });
//     }

//     // Validate required fields
//     if (!userId || !fullName || !userName || !age || !height) {
//         return res.status(400).json({ message: "Missing required fields" });
//     }

//     try {
//         // Ensure the logged-in user is the one trying to update their own details
//         if (session.user._id !== userId) {
//             return res
//                 .status(403)
//                 .json({ message: "You can only update your own details" });
//         }

//         // Connect to the database
//         await connectToDB();

//         // Find and update the user by userId
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { fullName, userName, profilePic, age, height },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res
//             .status(200)
//             .json({ message: "User updated successfully", user: updatedUser });
//     } catch (error) {
//         console.error("Error updating user:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };
