import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Configure SendGrid
const apiKey = process.env.VITE_SENDGRID_API_KEY;
console.log('SendGrid API Key:', apiKey ? 'Present' : 'Missing');
sgMail.setApiKey(apiKey);

app.post('/api/send-email', async (req, res) => {
  console.log('Received request to send email:', req.body);
  const { to, subject, text, html } = req.body;

  if (!to || !subject || !text) {
    console.error('Missing required fields');
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }

  const msg = {
    to,
    from: {
      email: 'contact@douaisupercross.fr',
      name: 'Supercross de Douai'
    },
    subject,
    text,
    html: html || text
  };

  try {
    console.log('Attempting to send email with message:', msg);
    await sgMail.send(msg);
    console.log('Email sent successfully to:', to);
    res.json({ success: true });
  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error('Error body:', error.response.body);
    }
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.response?.body
    });
  }
});

const PORT = process.env.PORT || 3001;

// Check if port is in use
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', err);
  }
});
