// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import connectToDB from "@/lib/dbConnection";
// import User from "@/models/user.model";
// import Exercise from "@/models/exercise.model";
// import DailyExercise from "@/models/dailyExercise.model";
// import generateExercisePlan from "@/core/generateExercisePlan";
// import { IExercise } from "@/models/exercise.model";
// import { ExercisePlanResult } from "@/core/generateExercisePlan";
// import { UserData } from "@/core/generateExercisePlan";

// export async function POST(req: NextRequest) {
//     try {
//         // Connect to database
//         await connectToDB();

//         // Authenticate user
//         const token = await getToken({ req });
//         if (!token) {
//             return NextResponse.json(
//                 { error: "Unauthorized" },
//                 { status: 401 }
//             );
//         }

//         // Find user and populate necessary references
//         const user = await User.findById(token.sub)
//             .populate("preferences")
//             .populate("healthAndDietary")
//             .lean(); // Use lean for performance

//         if (!user) {
//             return NextResponse.json(
//                 { error: "User not found" },
//                 { status: 404 }
//             );
//         }

//         // Remove unwanted populated fields
//         const {
//             dietId,
//             exerciseId,
//             userStats,
//             fullName,
//             userName,
//             email,
//             password,
//             googleId,
//             profilePic,
//             ...userForExercisePlan
//         } = user;

//         // Generate exercise plan
//         const exercisePlanResult: ExercisePlanResult =
//             await generateExercisePlan(userForExercisePlan as any);

//         // Store exercises from the generated plan
//         const exercises: any = await Promise.all(
//             exercisePlanResult.exercises.map(async (exercise: IExercise) => {
//                 const exerciseDoc = new Exercise({
//                     exerciseName: exercise.exerciseName,
//                     exerciseType: exercise.exerciseType,
//                     primaryMuscleTarget: exercise.primaryMuscleTarget,
//                     secondaryMuscleTarget: exercise.secondaryMuscleTarget,
//                     exerciseDuration: exercise.exerciseDuration,
//                     equipmentRequired: exercise.equipmentRequired,
//                     calorieBurn: exercise.calorieBurn,
//                     beginnerSets: exercise.beginnerSets,
//                     beginnerReps: exercise.beginnerReps,
//                     intermediateSets: exercise.intermediateSets,
//                     intermediateReps: exercise.intermediateReps,
//                     expertSets: exercise.expertSets,
//                     expertReps: exercise.expertReps,
//                     restTime: exercise.restTime,
//                     adviseWhenDoingExercise: exercise.adviseWhenDoingExercise,
//                 });
//                 return await exerciseDoc.save();
//             })
//         );

//         // Create daily exercise entry
//         const dailyExercise = new DailyExercise({
//             userId: user._id,
//             date: new Date(),
//             exercises: exercises.map((exercise: any) => exercise._id),
//         });

//         await dailyExercise.save();

//         return NextResponse.json({
//             message: "Exercise plan generated successfully",
//             exercisePlan: exercisePlanResult,
//             dailyExerciseId: dailyExercise._id,
//         });
//     } catch (error) {
//         console.error("Exercise plan generation error:", error);
//         return NextResponse.json(
//             {
//                 error: "Failed to generate exercise plan",
//                 details:
//                     error instanceof Error ? error.message : "Unknown error",
//             },
//             { status: 500 }
//         );
//     }
// }
