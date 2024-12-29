import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// Generate a JWT
const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

// Decode a JWT
const decodeToken = (token: string): JwtPayload | null => {
    const decoded = jwt.decode(token);
    return decoded as JwtPayload | null; // Ensure it's cast to JwtPayload or null
};

export { generateToken, decodeToken };
