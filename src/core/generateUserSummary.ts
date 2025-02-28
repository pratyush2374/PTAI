import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

interface UserSummary {
    totalCaloriesBurnt: number;
    totalCaloriesGained: number;
    summary: string;
}

const generateUserSummary = async (userData: any): Promise<UserSummary> => {
    // Calculate total calories burnt from daily stats
    const totalCaloriesBurnt = userData.stats.daily.reduce(
        (total: number, day: any) => total + (day.caloriesBurnt || 0),
        0
    );

    // Calculate total calories gained (if available)
    const totalCaloriesGained = userData.stats.daily.reduce(
        (total: number, day: any) => total + (day.caloriesGained || 0),
        0
    );

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    // Configure the model
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    // Extract relevant user information for the summary
    const dailyStats = userData.stats.daily;
    const recentWorkouts = dailyStats.slice(0, 7); // Get the most recent 7 days of data

    // Calculate average stats
    const avgCaloriesBurnt = recentWorkouts.reduce((sum: number, day: any) => sum + (day.caloriesBurnt || 0), 0) / recentWorkouts.length;
    const avgStepCount = recentWorkouts.reduce((sum: number, day: any) => sum + (day.stepCount || 0), 0) / recentWorkouts.length;
    
    // Create focus areas list from recent workouts
    const recentFocusAreas = recentWorkouts
        .map((day: any) => day.focusArea)
        .filter((area: string) => area !== undefined && area !== null);

    // Create the prompt
    const prompt = `Generate a personalized fitness summary and recommendations based on the following user data:
    
    Personal Info:
    - Name: ${userData.fullName}
    - Age: ${userData.age}
    - Gender: ${userData.gender}
    - Height: ${userData.height} cm
    - Weight: ${userData.weights[0].weight} kg
    
    Fitness Goals: ${userData.preferences.fitnessGoals.join(", ")}
    Activity Level: ${userData.preferences.activityLevel}
    Exercise Experience: ${userData.preferences.exerciseExperience}
    Preferred Exercise Types: ${userData.preferences.preferredExerciseType.join(", ")}
    
    Recent Stats:
    - Average Daily Calories Burnt: ${avgCaloriesBurnt.toFixed(0)}
    - Total Calories Burnt (All Recorded Days): ${totalCaloriesBurnt}
    - Average Daily Steps: ${avgStepCount.toFixed(0)}
    - Current Streak: ${userData.stats.currentStreak} days
    - Highest Streak: ${userData.stats.highestStreak} days
    - Recent Workout Focus Areas: ${recentFocusAreas.join(", ")}
    
    Create a personalized 100-word summary that:
    1. Evaluates their current performance against their goals
    2. Provides specific advice on what to improve to reach their fitness goals faster
    3. Estimates projected time to reach their goals if they continue with current progress
    4. Mentions that we'll be tuning their plans accordingly
    5. Write plain text no bold and no italics and all
    
    The summary should be motivational but realistic.`;

    // Generate the summary
    const result = await model.generateContent(prompt);
    const summaryText = result.response.text();

    return {
        totalCaloriesBurnt,
        totalCaloriesGained,
        summary: summaryText
    };
};

export default generateUserSummary;