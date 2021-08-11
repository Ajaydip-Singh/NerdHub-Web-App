import jwt from 'jsonwebtoken';
import { User } from '../interfaces/user';

/* Generates a JWT token for a non-admin user
 *
 * Inputs:
 *
 *   user - user object complying fields as defined by the User interface
 *
 */
const generateToken = (user: User, expiresIn = '30d'): string => {
  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn
    }
  );
  return token;
};

export default generateToken;
