import Mailgen from 'mailgen';

export const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'NerdHub Kenya',
    link: 'http://localhost:3000/home'
  }
});
