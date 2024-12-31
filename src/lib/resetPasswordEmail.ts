import nodemailer from "nodemailer";

async function sendResetPasswordEmail(
    fullName: string,
    email: string,
    resetLink: string
) {
    // Create a transporter using Gmail's SMTP server
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Set up email data
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `Hello ${fullName},\n\nWe received a request to reset your password. Please use the link below to set a new password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.\n\nThank you,\nPTAI Team`,
    };

    // Send the email
    return transporter.sendMail(mailOptions);
}

export default sendResetPasswordEmail;
