import jwt from 'jsonwebtoken';
import { User } from '../interfaces/user';

/* Generates a JWT token for a non-admin user
 *
 * Inputs:
 *
 *   user - user object complying fields as defined by the User interface
 *
 */
const generateToken = (user: User): string => {
  const token = jwt.sign(
    {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '30d'
    }
  );
  return token;
};

export default generateToken;
