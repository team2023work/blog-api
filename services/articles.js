const ArticlesModel = require("../models/articles")
const { OC, FC, QC } = require("../common/getChecker")


// get article
const Get = ($sort, $limit, $skip, $filter, $expend, $q) => {

    return new Promise((resolve, reject) => { // get article
 
        $expend =
            $expend === "all" ? [
                { path: 'user', model: "user" },
                // { path: 'photo', model: "media" },
                { path: 'category', model: "category" },
                { path: 'tags', model: "tag" },
            ] : $expend

            ArticlesModel.find({ ...QC("article", $q), ...FC($filter) }, {}, OC($skip, null, $sort)).populate($expend)
                .then(articles => {

                    resolve({ sort: $sort, skip: $skip, limit: $limit, value: articles.slice(0, $limit), count: articles.length })

                }).catch(err => { reject(err) })

    })
}


// add article
const Add = (title, description, photo, category, tags, user, status, visible, videoUrl) => {

    return new Promise((resolve, reject) => { // check article


        const newArticle = new ArticlesModel({
            title, description, photo, category, tags, user, status, visible, videoUrl
        })

        newArticle.save()
            .then(doc => { resolve(doc["_id"]) })
            .catch(err => { reject(err) })
    })
}

// edit article
const Edit = (id, title, description, photo, category, tags, user, status, visible, videoUrl) => {

    return new Promise((resolve, reject) => { // update article

        // check id
        ArticlesModel.findByIdAndUpdate({},
            {
                title, description, photo, category, tags, user, status, visible, videoUrl, updatedAt: Date.now()
            }
        ).where("_id").equals(id)
            .then(article => {

                if (!article) {
                    reject("did not match any document")
                } else {
                    resolve("modified")
                }
            }).catch(err => { reject(err) })

    })
}


// remove article  
const Remove = (id) => {

    return new Promise((resolve, reject) => { // update article

        // check id
        ArticlesModel.findByIdAndDelete({}).where("_id").equals(id)
            .then(article => {

                //check res here
                if (!article) {
                    reject("did not match any document")
                } else {
                    resolve("removed")
                }
            }).catch(err => { reject(err) })

    })

}



module.exports = { Get, Add, Edit, Remove }