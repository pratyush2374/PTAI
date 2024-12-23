// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import connectToDB from "@/lib/dbConnection";
// import User from "@/models/user.model";
// import HealthAndDietary from "@/models/healthAndDietary.model";
// import { z } from "zod";
// import healthAndDietarySchema from "@/schemas/healthAndDietary.schema";

// export async function PUT(req: NextRequest) {
//     try {
//         // Authenticate the user
//         const token = await getToken({
//             req,
//             secret: process.env.NEXTAUTH_SECRET,
//         });
//         if (!token) {
//             return NextResponse.json(
//                 { message: "Unauthorized: Please log in" },
//                 { status: 401 }
//             );
//         }

//         // Parse and validate the request body
//         const body = await req.json();
//         const validatedData = healthAndDietarySchema.parse(body);

//         // Connect to the database
//         await connectToDB();

//         // Fetch the user and ensure they exist
//         const user = await User.findById(token.sub);
//         if (!user) {
//             return NextResponse.json(
//                 { message: "User not found" },
//                 { status: 404 }
//             );
//         }

//         // Find or create the HealthAndDietary document
//         let healthAndDietary = await HealthAndDietary.findById(
//             user.healthAndDietary
//         );

//         if (!healthAndDietary) {
//             // Create a new HealthAndDietary record if it doesn't exist
//             healthAndDietary = new HealthAndDietary({
//                 dietaryPreferences: validatedData.dietaryPreferences || [],
//                 healthProblems: validatedData.healthProblems || [],
//                 allergies: validatedData.allergies || [],
//             });

//             // Save the new HealthAndDietary record
//             await healthAndDietary.save();

//             // Update the user's reference
//             user.healthAndDietary = healthAndDietary._id as any;
//             await user.save();
//         } else {
//             // Update existing HealthAndDietary document
//             healthAndDietary.dietaryPreferences =
//                 validatedData.dietaryPreferences ||
//                 healthAndDietary.dietaryPreferences;
//             healthAndDietary.healthProblems =
//                 validatedData.healthProblems || healthAndDietary.healthProblems;
//             healthAndDietary.allergies =
//                 validatedData.allergies || healthAndDietary.allergies;

//             await healthAndDietary.save();
//         }

//         return NextResponse.json(
//             {
//                 message: "Health and dietary information updated successfully",
//                 healthAndDietary,
//             },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Error updating health and dietary info:", error);

//         // Handle validation errors
//         if (error instanceof z.ZodError) {
//             return NextResponse.json(
//                 { message: "Validation error", errors: error.errors },
//                 { status: 400 }
//             );
//         }

//         return NextResponse.json(
//             { message: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }
