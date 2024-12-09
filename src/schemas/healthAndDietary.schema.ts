import { z } from "zod";

const healthAndDietarySchema = z.object({
    dietaryPreferences: z.array(z.string()).optional(),
    healthProblems: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
});

export default healthAndDietarySchema;