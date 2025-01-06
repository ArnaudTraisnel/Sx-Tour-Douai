import mail from '@sendgrid/mail';

const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;
mail.setApiKey(SENDGRID_API_KEY);

export async function sendEmail({ to, subject, text, html }) {
  try {
    const msg = {
      to,
      from: 'contact@sxtour-douai.fr',
      subject,
      text,
      html
    };

    await mail.send(msg);
    console.log('Email sent successfully to:', to)
    return { success: true };
  } catch (error) {
    console.error('Email Service Error:', error)
    return { 
      success: false, 
      error: error.message 
    };
  }
}
