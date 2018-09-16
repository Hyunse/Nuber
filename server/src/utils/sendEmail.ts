import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey: `${process.env.MAILGUN_API_KEY}`,
  domain: 'sandbox6758be12ebc34a4c929727ecd0eb1258.mailgun.org'
});

export default mailGunClient;