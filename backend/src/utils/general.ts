// Create random code
export const generateRandomCode = (): string => {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let code = '';
  for (let i = 0; i < 25; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }
  return code;
};
