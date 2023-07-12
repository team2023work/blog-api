const FC = filter => {
    return filter ? JSON.parse(filter) : {}
}



const QC = (s, q) => {

    const adminFilter = [ "fullname", "email" ]
    const userFilter = [ "fullname", "email", "phone"]
    const articleFilter = [ "title", "description", "videoUrl"]
    const categoryFilter = [ "name", "description" ]
    const tagFilter = [ "name"]

    let $or = []

    $or =
    (q && s) === "article" ? $or = articleFilter.map(key => ({ [key]: { $regex: q, $options: "i" } })) :
    (q && s) === "category" ? $or = categoryFilter.map(key => ({ [key]: { $regex: q, $options: "i" } })) :
    (q && s) === "tag" ? $or = tagFilter.map(key => ({ [key]: { $regex: q, $options: "i" } })) :
    (q && s) === "user" ? $or = userFilter.map(key => ({ [key]: { $regex: q, $options: "i" } })) :
    (q && s) === "admin" ? $or = adminFilter.map(key => ({ [key]: { $regex: q, $options: "i" } })) :
    $or


    return !!$or.length ? {$or} : {}
}

const OC = (skip, limit, sort) => {
     let options = {}

     skip && (options.skip = skip)
     limit && (options.limit = limit)
     sort && (options.sort = JSON.parse(sort))

     return options
} 




module.exports = { FC , OC , QC }