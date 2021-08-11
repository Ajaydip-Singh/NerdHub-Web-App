import mailgun, { Mailgun } from 'mailgun-js';

export const mg = (): Mailgun =>
  mailgun({
    apiKey: String(process.env.MG_API_KEY),
    domain: String(process.env.MG_DOMAIN)
  });
