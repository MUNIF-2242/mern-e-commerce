const { expressjwt: expressJwt } = require("express-jwt");

function authJwt() {
  const SECRET_KEY = process.env.SECRET_KEY;

  return expressJwt({
    secret: SECRET_KEY, // Use 'secret' instead of 'SECRET_KEY'
    algorithms: ["HS256"],
  });
}

module.exports = authJwt;
