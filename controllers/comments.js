const CommentsService = require("../services/comments")
const codes = require("../common/codes");


// get comment
const Get = (req, res) => {
    const { $sort, $limit, $skip, $filter, $expend} = req.query

    CommentsService.Get($sort, $limit, $skip, $filter, $expend).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}
 
// add comment
const Add = (req, res) => {
    const { comment , user , article } = req.body

    CommentsService.Add(comment , user , article).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

// edit comment
const Edit = (req, res) => {
    const { id } = req.params
    const { comment } = req.body

    CommentsService.Edit(id, comment).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

// remove comment
const Remove = (req, res) => {
    const { id } = req.params

    CommentsService.Remove(id).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}


module.exports = { Get , Add , Remove , Edit }