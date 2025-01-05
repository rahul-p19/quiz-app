import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "false",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendWelcomeEmail(email: string, name: string) {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: "Registration Confirmation - HELLO-IEEE!",
            html: `
        <h2>Dear ${name}!</h2>
        <h3>Greetings from IEEE JUSB!</h3>
        <p>
Congratulations for registering to HELLO-IEEE, our official orientation program specially for you!</p>
        <p>Mark your calendars on the <b>8th of January, 2025</b>, and be present at <b>Dr. Triguna Sen Auditorium, Jadavpur University</b>,to witness a plethora of exciting activities- including sessions on web development and machine learning, finally the much awaited announcement of winners to the meme competition ,Lolgorithm.</p>
      <p>Did we also say that you get to network with industry experts and stand a chance to win limited edition prizes?</p>
      <p>Please feel free to reply to this email for any queries / clarifications or reach out to us on our official WhatsApp groups.
      Follow this link to join our WhatsApp group: https://chat.whatsapp.com/EXuC1GZz89dFIjv0k1xJWV </p><h3>Warm wishes,</h3><h3>IEEE JUSB.</h3>`,
        });
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
}









