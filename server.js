const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'gmail';
const OWNER_EMAIL = process.env.OWNER_EMAIL || EMAIL_USER;

function escapeHtml(value) {
    if (!value) return '';
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

if (!EMAIL_USER || !EMAIL_PASS) {
    console.error('Missing EMAIL_USER or EMAIL_PASS in environment variables.');
    console.error('Create a .env file and set EMAIL_USER and EMAIL_PASS before starting the server.');
}

const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Email transporter verification failed:', error);
    } else {
        console.log('Email transporter is ready.');
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please complete all required fields.' });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject || 'New portfolio inquiry');
    const safeMessage = escapeHtml(message);

    const ownerMail = {
        from: `Portfolio Contact <${EMAIL_USER}>`,
        to: OWNER_EMAIL,
        subject: `[Portfolio Inquiry] ${safeName} — ${safeSubject}`,
        replyTo: safeEmail,
        html: `
            <h2>New message from your portfolio</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage.replace(/\n/g, '<br>')}</p>
        `,
    };

    const autoReply = {
        from: `Ashad Alam <${EMAIL_USER}>`,
        to: safeEmail,
        subject: `Thanks for reaching out, ${safeName}!`,
        html: `
            <h2>Thank you for getting in touch!</h2>
            <p>Hi ${safeName},</p>
            <p>Thank you for reaching out to me. I received your message and will contact you soon.</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <p><strong>Your message:</strong></p>
            <p>${safeMessage.replace(/\n/g, '<br>')}</p>
            <p>Warm regards,<br>Ashad Alam</p>
        `,
    };

    try {
        await transporter.sendMail(ownerMail);
        await transporter.sendMail(autoReply);
        return res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Error sending contact email:', error);
        return res.status(500).json({ error: 'Unable to send message right now. Please try again later.' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
