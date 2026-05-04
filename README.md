# Portfolio Website with Contact Backend

This is a personal portfolio website for **Ashad Alam** with a working contact form backed by a Node.js/Express server.

## Features

- Responsive portfolio landing page built with HTML, CSS, and JavaScript
- Custom cursor, theme toggle, animated sections, and contact form
- Backend contact form support with email delivery using Nodemailer
- Automated reply sent to users after form submission

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
copy .env.example .env
```

3. Update `.env` with your email credentials:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=ashadalam2006@gmail.com
EMAIL_PASS=your_gmail_app_password
OWNER_EMAIL=ashadalam2006@gmail.com
PORT=3000
```

4. Start the server:

```bash
npm start
```

5. Open the site:

Visit `http://localhost:3000`

## Contact Form

- Sends messages from the website visitor to `OWNER_EMAIL`
- Sends an automated thank-you reply back to the sender

## Notes

- For Gmail, use an App Password when 2FA is enabled
- Keep `.env` secret and do not commit it to version control
