const LikesService = require("../services/likes")
const codes = require("../common/codes");

 
// get like 
const Get = (req, res) => {
    const { $sort, $limit, $skip, $filter, $expend} = req.query

    LikesService.Get($sort, $limit, $skip, $filter, $expend).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}
 
// add like
const Add = (req, res) => {
    const { user , post } = req.body
 
    LikesService.Add(user , post).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}


// remove like
const Remove = (req, res) => {
    const { id } = req.params

    LikesService.Remove(id).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

module.exports = { Get , Add , Remove }