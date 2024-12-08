import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import connectToDB from '@/lib/dbConnection';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
    const { oldPassword, newPassword } = await req.json();

    // Get session from the NextRequest object
    const session = await getSession({ req: req as any });
    if (!session) {
        return NextResponse.json(
            { message: 'You must be logged in to change your password' },
            { status: 401 }
        );
    }

    const userId = session.user._id; // Get the userId from the session

    // Validate required fields
    if (!oldPassword || !newPassword) {
        return NextResponse.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    try {
        // Connect to the database
        await connectToDB();

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Check if the old password is correct
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json(
                { message: 'Incorrect old password' },
                { status: 401 }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password with the new hashed password
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json(
            { message: 'Password changed successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error changing password:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
};
