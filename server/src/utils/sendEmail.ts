import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey: `${process.env.MAILGUN_API_KEY}`,
  domain: 'sandbox6758be12ebc34a4c929727ecd0eb1258.mailgun.org'
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: 'anzmf12@naver.com',
    to: 'anzmf12@naver.com',
    subject,
    html
  };

  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string,) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody= `Verify your email by clicking <a href="http://nuber.com/${key}">here</a>`;

  return sendEmail(emailSubject, emailBody);
};
