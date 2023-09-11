const ArticlesModel = require("../models/articles")
const { OC, checkDateFilter, QC } = require("../common/getChecker")


// get article
const Get = ($sort, $limit, $skip, $filter, $expend, $q) => {

    return new Promise((resolve, reject) => { // get article

        $expend =
            $expend === "user" ?
                [   
                    { $addFields: { userId: { $toString: "$user" } } },
                    { $lookup: { from: `users`, localField: "user", foreignField: "_id", as: `user` } },
                    {
                        $addFields: {
                            user: { $first: "$user" },
                            _id: { $toString: "$_id" }, category: { $toString: "$category" },
                        }
                    }
                ]
                :
                $expend === "category" ?
                    [
                        { $addFields: { categoryId: { $toString: "$category" } } },
                        { $lookup: { from: `categories`, localField: "category", foreignField: "_id", as: `category` } },
                        {
                            $addFields: {
                                category: { $first: "$category" },
                                _id: { $toString: "$_id" }, user: { $toString: "$user" }
                            }
                        }
                    ]
                    :
                    $expend === "tags" ?
                        [
                            
                            { $lookup: { from: `tags`, localField: "tags", foreignField: "_id", as: `tags` } },
                            {
                                $addFields: {
                                    _id: { $toString: "$_id",  user: { $toString: "$user" }, category: { $first: "$category" } }
                                }
                            }
                        ]
                        :

                        $expend === "all" ?
                            [
                                { $addFields: { userId: { $toString: "$user" }, categoryId: { $toString: "$category" } } },
                                { $lookup: { from: `users`, localField: "user", foreignField: "_id", as: `user` } },
                                { $lookup: { from: `tags`, localField: "tags", foreignField: "_id", as: `tags` } },
                                { $lookup: { from: `categories`, localField: "category", foreignField: "_id", as: `category` } },
                                {
                                    $addFields: {
                                        user: { $first: "$user" }, category: { $first: "$category" },
                                        _id: { $toString: "$_id" }
                                    }
                                }
                            ]
                            : [
                                {
                                    $addFields: {
                                        _id: { $toString: "$_id"}, user: { $toString: "$user" }, category: { $toString: "$category" } 
                                    }
                                }
                            ]

 
  
        ArticlesModel.aggregate([
                { $lookup: { from: `likes`, localField: "_id", foreignField: "article", as: `likesCount` } },
                { $addFields: { likesCount: { $size: "$likesCount" } } },
                ...$expend,
                { $match: { ...QC("article", $q), ...checkDateFilter($filter) } },
                { $skip: $skip ? parseInt($skip) : 0 },
                { $limit: $limit ? parseInt($limit) : 1000 },
                { $sort: $sort ? JSON.parse($sort) : { "_id": 1 } }
            ]).exec().then(articles => { 
     
              resolve({ sort: $sort, skip: $skip, limit: $limit, value: articles.slice(0, $limit), count: articles.length })

            
            }).catch(err => { reject(err) })

            // ArticlesModel.find({ ...QC("article", $q), ...checkDateFilter($filter) }, {}, OC($skip, null, $sort)).populate($expend)
            //     .then(articles => {

            //         resolve({ sort: $sort, skip: $skip, limit: $limit, value: articles.slice(0, $limit), count: articles.length })

            //     }).catch(err => { reject(err) })

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

    return new Promise((resolve, reject) => { 

        // check id
        ArticlesModel.findByIdAndDelete({}).where("_id").equals(id)
            .then(article => {

                //check if deleted here
                if (!article) {
                    reject("did not match any document")
                } else {
                    resolve("removed")
                }
            }).catch(err => { reject(err) })

    })

}



module.exports = { Get, Add, Edit, Remove }