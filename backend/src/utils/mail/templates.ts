import { User } from '../../interfaces/user';

export const confirmEmailTemplate = (
  user: User,
  confirmationCode: string
): any => {
  return {
    body: {
      name: `${user.firstName} ${user.lastName}`,
      intro: "Welcome to NerdHub! We're very excited to have you.",
      action: {
        instructions: `To verify your email, please click on the button below.`,
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `http://localhost:3000/login/${user._id}/${confirmationCode}`
        }
      },
      outro: `If button does not work, go here directly: http://localhost:3000/login/${user._id}/${confirmationCode} Need help, or have questions? Just reply to this email, we'd love to help.`
    }
  };
};
