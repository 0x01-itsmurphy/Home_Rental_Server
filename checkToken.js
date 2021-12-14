const jwt = require("jsonwebtoken");
const config = require("./config");

const cToken = (req, res, next) => {
  const token = req.headers["auth-token"];
  // token = token.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, config.key, (err, user) => {
      if (err) {
        return res.status(401).json({
          status: false,
          message: "Invalid token",
        });
      } else {
        req.user = user;
        console.log(user);
        next();
      }
    });
  } else {
    return res.status(500).json({
      status: false,
      message: "Auth token is not supplied",
    });
  }
};

module.exports = { cToken: cToken };
