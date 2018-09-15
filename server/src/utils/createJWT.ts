import jwt from 'jsonwebtoken';

/**
 * Create Json Web Token
 * @param id 
 */
const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id
    },
    `${process.env.JWT_TOKEN}`
  );

  return token;
};

export default createJWT;
