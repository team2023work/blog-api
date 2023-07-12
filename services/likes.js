const LikesModel = require("../models/likes")
const { OC, FC } = require("../common/getChecker")

 
// get Like
const Get = ($sort, $limit, $skip, $filter, $expend ) => {

    return new Promise((resolve, reject) => { // get Like
 
      
        $expend =
        $expend === "all" ? [{ path: 'user', model: 'user'}, { path: 'article', model: 'article' }] :
        $expend
        
        
        LikesModel.find(FC($filter), {}, OC($skip, null, $sort)).populate($expend)
         .then(Likes => {
 
             resolve({ sort: $sort, skip: $skip, limit: $limit, value: Likes.slice(0, $limit), count: Likes.length })

         }).catch(err => {
             console.log(err)
 
             reject(err)
         })

    })
}


// add Like
const Add = (user, post) => {

    return new Promise((resolve, reject) => { // check Like

        const newLike = new LikesModel({ user, post })

        newLike.save()
            .then(doc => { resolve(doc["_id"]) })
            .catch(err => { reject(err) })
    })
}


// remove Like  
const Remove = (id) => {

    return new Promise((resolve, reject) => { // update Like

        // check id
        LikesModel.findByIdAndDelete({}).where("_id").equals(id)
            .then(Like => {

                //check res here
                if (!Like) {
                    reject("did not match any document")
                } else {
                    resolve("removed")
                }
            }).catch(err => { reject(err) })

    })

}



module.exports = { Get , Add , Remove }