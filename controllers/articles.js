const PrticlesService = require("../services/articles")
const codes = require("../common/codes");
  
  
// get article
const Get = (req, res) => {
    const { $sort, $limit, $skip, $filter, $expend, $q  } = req.query

    PrticlesService.Get($sort, $limit, $skip, $filter, $expend, $q ).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}



// add article
const Add = (req, res) => {
    const { title, description, photo, category, tags, user, status, visible, videoUrl } = req.body

    PrticlesService.Add(title, description, photo, category, tags, user, status, visible, videoUrl).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

// edit article
const Edit = (req, res) => {
    const { title, description, photo, category, tags, user, status, visible, videoUrl} = req.body
    const { id } = req.params
    
    PrticlesService.Edit(id , title, description, photo, category, tags, user, status, visible, videoUrl).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}


// remove article
const Remove = (req, res) => {
    const { id } = req.params

    PrticlesService.Remove(id).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}


module.exports = { Get, Add, Edit, Remove }