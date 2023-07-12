const verifyToken = require("./verifyToken")
const codes = require("../../common/codes");

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization
    
  if (auth && auth.startsWith('Bearer')) {
       const token = auth.slice(7)

    try {
      const tokenData = verifyToken(token)
      req.user = tokenData
      next()

    } catch (error) {
      throw { message: `unauthorized: ${codes.unauthorized}`}
    }

  } else {
    throw { message: `unauthorized: ${codes.unauthorized}`}
  }
}

module.exports = authMiddleware