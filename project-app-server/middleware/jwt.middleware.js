const { expressjwt: jwt } = require('express-jwt');

// instantitate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload', // we'll be able to access the decoded jwt in req.payload
  getToken: getTokenFromHeaders // the function below to extract the jwt
});

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNhNGI1MjljYzY1ODBkNjFjM2ZjZTMiLCJlbWFpbCI6Imx1Y2lhQG1lLmNvbSIsIm5hbWUiOiJMdWNpYSIsImlhdCI6MTcwNzc1NjQzMSwiZXhwIjoxNzA3Nzc4MDMxfQ.9LXVarviwLgoVX1x-F5YAGD-t3um5hdTXOOVe5XDddM

function getTokenFromHeaders(req) {
  // checks if the token is available on the request headers
  // format: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    // get the token and return it
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  return null;
}

module.exports = { isAuthenticated };
