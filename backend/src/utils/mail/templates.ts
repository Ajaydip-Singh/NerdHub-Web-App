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
          link: `${process.env.DOMAIN}/login/${user._id}/${confirmationCode}`
        }
      },
      outro: `If button does not work, go here directly: ${process.env.DOMAIN}/login/${user._id}/${confirmationCode} Need help, or have questions? Just reply to this email, we'd love to help.`
    }
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const shopPaymentReceiptEmailTemplateSuccess = (
  user: User,
  order: string
): any => {
  return {
    body: {
      name: `${user.firstName} ${user.lastName}`,
      intro: `Your payment for order: ${order} has been received`,
      action: {
        instructions: `You can check the status of your order and more in your orders dashboard:`,
        button: {
          color: '#3869D4',
          text: `Go to Orders Dashboard`,
          link: `${process.env.DOMAIN}/shop`
        }
      }
    },
    outro: 'Thank you for shopping with us.'
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const shopPaymentReceiptEmailTemplateFail = (
  user: User,
  order: string
): any => {
  return {
    body: {
      name: `${user.firstName} ${user.lastName}`,
      intro: `Your payment for order: ${order} has failed`,
      action: {
        instructions:
          'For security reasons, we are deleting your order since payment was not succesful. Please make sure that your payment details are correct the next time you attempt to pay for the new order.',
        button: {
          color: '#3869D4',
          text: `Go Shopping`,
          link: `${process.env.DOMAIN}/shop`
        }
      }
    },
    outro: 'Apologies from Nerdhub for any inconveniences.'
  };
};

export const shopOrderReceiptEmailTemplate = (
  user: User,
  orderItems: any
): any => {
  const items: {
    name: string;
    quantity: number;
    total: number;
  }[] = [];
  orderItems.map(
    (item: {
      name: string;
      quantity: number;
      price: number;
      taxPrice: number;
      totalPrice: number;
    }) => {
      items.push({
        name: item.name,
        quantity: item.quantity,
        total: (item.price + item.taxPrice) * item.quantity
      });
    }
  );

  return {
    body: {
      name: `${user.firstName} ${user.lastName}`,
      intro: `Your order has been processed successfully.`,
      table: {
        data: items,
        columns: {
          // Optionally, customize the column widths
          customWidth: {
            name: '50%',
            quantity: '25%',
            total: '25%'
          },
          // Optionally, change column text alignment
          customAlignment: {
            price: 'right'
          }
        }
      },
      action: {
        instructions:
          'We will send you an email upon successful payment of order. In the meanwhile you can check the status of your order and more in your orders dashboard:',
        button: {
          color: '#3869D4',
          text: 'Go to Orders Dashboard',
          link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
        }
      },
      outro: 'We thank you for your order.'
    }
  };
};
