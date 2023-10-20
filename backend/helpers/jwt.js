const { expressjwt: expressJwt } = require("express-jwt");

function authJwt() {
  const SECRET_KEY = process.env.SECRET_KEY;
  const api = process.env.API_URL;

  return expressJwt({
    secret: SECRET_KEY, // Use 'secret' instead of 'SECRET_KEY'
    algorithms: ["HS256"],
    isRevoked,
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      //{ url: /\/api\/v1\/users(.*)/, methods: ["GET", "POST", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

async function isRevoked(req, payload) {
  //console.log(payload);
  if (!payload.payload.isAdmin) {
    //console.log("Not Admin");
    return true;
  }
  // console.log("Admin");
  return false;
}

module.exports = authJwt;
