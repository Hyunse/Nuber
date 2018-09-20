import jwt from 'jsonwebtoken';

/**
 * Create Json Web Token
 * @param {number} id
 * @return {Object} token
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
