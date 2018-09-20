import Mailgun from 'mailgun-js';

// Get Mailgun
const mailGunClient = new Mailgun({
  apiKey: `${process.env.MAILGUN_API_KEY}`,
  domain: 'sandbox6758be12ebc34a4c929727ecd0eb1258.mailgun.org'
});

/**
 * Send Email
 * 
 * @param {string} subject 
 * @param {string} html 
 * @desc Send Email via Mailgun
 */
const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: 'anzmf12@naver.com',
    to: 'anzmf12@naver.com',
    subject,
    html
  };

  return mailGunClient.messages().send(emailData);
};

/**
 * Send Verification Email
 * 
 * @param {string} fullName 
 * @param {string} key
 * @desc Set Email Subject & Email Body
 */
export const sendVerificationEmail = (fullName: string, key: string,) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody= `Verify your email by clicking <a href="http://nuber.com/${key}">here</a>`;

  return sendEmail(emailSubject, emailBody);
};
