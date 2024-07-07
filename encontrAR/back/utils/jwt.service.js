import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY || "default-secret";

export const generateToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: '1d'
  })

  return token
}

export const verifyToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    return verifiedToken;
  } catch (err) {
    if (
      err.name === "JsonWebTokenError" &&
      err.message === "invalid signature"
    ) {
      console.error("El token ha sido alterado o manipulado");
      return null;
    } else if (err.name === "TokenExpiredError") {
      console.error("El token ha expirado");
      return null;
    } else {
      console.error("Error al verificar el token:", err.message);
      return null;
    }
  }
};
