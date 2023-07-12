const CommentsModel = require("../models/comments")
const { OC, FC } = require("../common/getChecker")
  
 
// get comment
const Get = ($sort, $limit, $skip, $filter, $expend) => {

    return new Promise((resolve, reject) => { // get comment

        $expend =
        $expend === "all" ? [{ path: 'user', model: 'user'}, { path: 'article', model: 'article' }] :
        $expend


        CommentsModel.find(FC($filter), {}, OC($skip, null, $sort)).populate($expend)
            .then(comments => {

                resolve({ sort: $sort, skip: $skip, limit: $limit, value: comments.slice(0, $limit), count: comments.length })

            }).catch(err => {

                reject(err)
            })

    })
} 


// add comment
const Add = (comment, user, article) => {

    return new Promise((resolve, reject) => { // check comment

        const newComment = new CommentsModel({ comment, user, article })

        newComment.save()
            .then(doc => { resolve(doc["_id"]) })
            .catch(err => { reject(err) })

    })
}


// edit comment
const Edit = (id, comment) => {

    return new Promise((resolve, reject) => { // update comment

        // check id
        CommentsModel.findByIdAndUpdate({}, { comment , updatedAt: Date.now() }).where("_id").equals(id)
            .then(comment => {

                if (!comment) {
                    reject("did not match any document")
                } else {
                    resolve("modified")
                }
            }).catch(err => { reject(err) })

    })
}


// remove comment  
const Remove = (id) => {
 
    return new Promise((resolve, reject) => { // update comment

        // check id
        CommentsModel.findByIdAndDelete({}).where("_id").equals(id)
            .then(comment => {

                //check res here
                if (!comment) {
                    reject("did not match any document")
                } else {
                    resolve("removed")
                }
            }).catch(err => { reject(err) })

    })

}


module.exports = { Get , Add , Remove , Edit }