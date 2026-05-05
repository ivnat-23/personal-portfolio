const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tanshpatil12@gmail.com',
        pass: 'irkl erur apbp isqz' // App password provided by user
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: 'tanshpatil12@gmail.com',
        to: 'tanshpatil12@gmail.com', // User wants to receive the emails themselves
        subject: `Portfolio Contact: ${subject} from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            
            Message:
            ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ success: false, message: 'Error sending email' });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send({ success: true, message: 'Email sent successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
