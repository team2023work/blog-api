const categoriesService = require("../services/categories")
const codes = require("../common/codes");


// get category
const Get = (req, res) => {
    const { $sort, $limit, $skip, $filter, $q  } = req.query

    categoriesService.Get($sort, $limit, $skip, $filter, $q ).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}
 
// add category
const Add = (req, res) => {
    const { name, description } = req.body

    categoriesService.Add(name, description).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

// edit category
const Edit = (req, res) => {
    const { name, description } = req.body
    const { id } = req.params

    categoriesService.Edit(id, name, description).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}   

// remove category
const Remove = (req, res) => {
    const { id } = req.params

    categoriesService.Remove(id).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

module.exports = { Get , Add , Remove , Edit }