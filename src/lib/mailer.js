import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email
    pass: process.env.EMAIL_PASS, // App Password
  },
  tls: {
    minVersion: "TLSv1.2", // Enforce TLS 1.2 or higher
    rejectUnauthorized: true, // Reject invalid certificates
  },
  // logger: true, // Optional: Enable logging for debugging
  // debug: true, // Optional: Show debug output
});

// reset mail sender function
export async function sendResetEmail(to, token) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  await transporter.sendMail({
    to,
    subject: "Reset Your Password",
    html: `<div style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #00ba7b; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Password Reset Request</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Hello,
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                We received a request to reset your password. Click the button below to reset it. This link is valid for the next 1 hour.
              </p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #00ba7b; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px; font-weight: bold;">
                  Reset Your Password
                </a>
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                If you didn’t request a password reset, please ignore this email or contact our support team at <a href="mailto:thereisnoonelikeafride@gmail.com" style="color: #007bff; text-decoration: none;">thereisnoonelikeafride@gmail.com</a>.
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">
                Thank you,<br>
                The JADUR HAAT Team
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666666;">
              <p style="margin: 0 0 10px;">
                &copy; 2025 JADUR HAAT. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>`,
  });
}

// TODO: send email function
/**
 * Utility function for email sending
 * @param {String} to - Recipient's mail address
 * @param {String} subject - Subject for the email
 * @param {String} html - Email template body
 */
export async function emailSender(to, subject, html) {
  await transporter.sendMail({
    to,
    subject,
    html,
  });
}
