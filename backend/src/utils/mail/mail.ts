import mailgun, { Mailgun } from 'mailgun-js';
import Mailgen from 'mailgen';

export const mg = (): Mailgun =>
  mailgun({
    apiKey: String(process.env.MG_API_KEY),
    domain: String(process.env.MG_DOMAIN)
  });

export const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'NerdHub Kenya',
    link: 'http://localhost:3000/home'
  }
});
