import sgMail from '@sendgrid/mail';

// Configure SendGrid with API key
const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        text,
        html
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send email');
    }

    console.log('Email sent successfully to:', to);
    return { success: true };
  } catch (error) {
    console.error('Email Service Error:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};
