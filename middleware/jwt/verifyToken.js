const JWt = require("jsonwebtoken")
const codes = require("../../common/codes");

const verifyToken = token => {

  try {
    const tokenData = JWt.verify(token, process.env.JWT_SECRET)
    return tokenData
  } catch (error) {
    throw { message: `unauthorized: ${codes.unauthorized}`}
  }
}

module.exports = verifyToken