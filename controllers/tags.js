const tagsService = require("../services/tags")
const codes = require("../common/codes");
 

// get tag
const Get = (req, res) => {
    const { $sort, $limit, $skip, $filter, $q  } = req.query

    tagsService.Get($sort, $limit, $skip, $filter, $q ).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}
 
// add tag
const Add = (req, res) => {
    const { name } = req.body

    tagsService.Add(name).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

// edit tag
const Edit = (req, res) => {
    const { name } = req.body
    const { id } = req.params

    tagsService.Edit(id, name).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

// remove tag
const Remove = (req, res) => {
    const { id } = req.params

    tagsService.Remove(id).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

module.exports = { Get , Add , Remove , Edit }