const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // const { username, userID } = decoded;
    // req.username = username;
    // req.userID = userID;
    next();
  } catch (err) {
    console.error(err);
    next("Authentication failure");
  }
};

module.exports = checkLogin;
