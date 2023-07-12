const codes = require("../common/codes");

//params Validator
const idValidator = (req, res, next) => {
    const { id } = req.params

    if (id == "" || id == null) {
        res.status(codes.badRequest).json({err: true, msg: "did not match any document"})
    }else{
       next() 
    }

}

module.exports = idValidator