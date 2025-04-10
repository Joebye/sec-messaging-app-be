import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import { logger } from '../logger.mjs';
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export default class AuthService {

signupUser = async (userObject: any) => {
  const { username, password } = userObject;
  try {
    const existing = await User.findOne({ username });

    if (existing) {
      logger.warn(`User with name: ${username} already exists`);
      return {
        success: false,
        statusCode: 409, 
        message: `User with name "${username}" already exists`,
      };
    }

    const hash = await bcrypt.hash(password, 12);
    const newUser = new User({ username, password: hash });
    const result = await newUser.save();

    logger.info(`[SIGNUP RESULT: ${username} has been registered successfully]`);

    return {
      success: true,
      statusCode: 201,
      data: result,
    };

  } catch (error) {
    logger.error(`Error signing up user: `, error);
    return {
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    };
  }
}

     
loginUser = async (userObject: any) => {
    const { username, password } = userObject;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        logger.warn(`Invalid login attempt. User: ${username} not found`);
        return {
          success: false,
          statusCode: 401,
          message: 'Invalid credentials',
        };
      }
  
      const valid = await bcrypt.compare(password, user.password as string);
      if (!valid) {
        logger.warn(`Invalid login attempt. Wrong password for user: ${username}`);
        return {
          success: false,
          statusCode: 401,
          message: 'Invalid credentials',
        };
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
  
      logger.info(`[LOGIN RESULT: ${username} has been logged in successfully]`);
      return {
        success: true,
        statusCode: 200,
        token,
      };
  
    } catch (error) {
      logger.error(`Error logging in user: `, error);
      return {
        success: false,
        statusCode: 500,
        message: 'Internal server error',
      };
    }
  };
  

}