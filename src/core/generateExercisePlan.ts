import { spawn } from 'child_process';
import path from 'path';
import { IExercise } from "@/models/exercise.model";
import { IUserPreferences } from '@/models/userPreferences.model';
import { IHealthAndDietary } from '@/models/healthAndDietary.model';
import { IWeight } from '@/models/user.model';

export interface UserData {
  age: number;
  gender: string;
  height: number;
  weight: IWeight[]
  preferences: IUserPreferences;
  healthAndDietary: IHealthAndDietary
}

export interface ExercisePlanResult {
  exercises: IExercise[];
}


async function generateExercisePlan(userData: UserData): Promise<ExercisePlanResult> {

  return new Promise((resolve, reject) => {
    // Path to Python script
    const pythonScriptPath = path.join(process.cwd(), 'python', 'generate_exercise_plan.py');

    // Spawn Python child process
    const python = spawn('python', [
      "./generateExercisePlan.py",
      JSON.stringify(userData)
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
        const result: ExercisePlanResult = JSON.parse(outputData);
        resolve(result as ExercisePlanResult);
      } catch (parseError) {
        reject(new Error(`Failed to parse exercise plan: ${parseError}`));
      }
    });

    // Handle process error
    python.on('error', (err) => {
      reject(err);
    });
  });
}

export default generateExercisePlan;
