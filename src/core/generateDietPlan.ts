import { spawn } from 'child_process';
import path from 'path';
import { IWeight } from '@/models/weight.model';

interface UserData {
  fullName: string;
  age: number;
  gender: string;
  height: number;
  weight: {
    weight: number;
    date: string;
  }[];
  preferences: {
    dietaryRestrictions?: string[];
    cuisinePreferences?: string[];
  };
  healthAndDietary: {
    medicalConditions?: string[];
    allergies?: string[];
  };
}

interface DietPlanResult {
  meals: {
    name: string;
    category: string[];
    weight: number;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fibre: number;
    otherMacroNutrients: string;
    keyIngredients: string[];
    commonAllergens?: string;
    cookingTime: number;
    recipe: string;
  }[];
}

async function generateDietPlan(userData: any): Promise<DietPlanResult> {
  // Transform weight data to match expected format
  const transformedUserData: UserData = {
    fullName: userData.fullName,
    age: userData.age,
    gender: userData.gender,
    height: userData.height,
    weight: userData.weight.map((w: any) => ({
      weight: w.weight,
      date: w.date
    })),
    preferences: userData.preferences || {},
    healthAndDietary: userData.healthAndDietary || {}
  };

  return new Promise((resolve, reject) => {
    // Path to Python script
    const pythonScriptPath = path.join(process.cwd(), 'python', 'generate_diet_plan.py');

    // Spawn Python child process
    const python = spawn('python3', [
      pythonScriptPath, 
      JSON.stringify(transformedUserData)
    ]);

    let outputData = '';
    let errorData = '';

    // Collect output data
    python.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    // Collect error data
    python.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    // Handle process close
    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed with code ${code}: ${errorData}`));
        return;
      }

      try {
        const result: DietPlanResult = JSON.parse(outputData);
        resolve(result);
      } catch (parseError) {
        reject(new Error(`Failed to parse diet plan: ${parseError}`));
      }
    });

    // Handle process error
    python.on('error', (err) => {
      reject(err);
    });
  });
}

export default generateDietPlan;