const tagsModel = require("../models/tags")
const { OC, FC, QC } = require("../common/getChecker")
   
// get tag
const Get = ($sort, $limit, $skip, $filter, $q ) => {

    return new Promise((resolve, reject) => { // get tag


        tagsModel.find({ ...QC("tag", $q), ...FC($filter) }, {},OC($skip, null, $sort))
            .then(categories => {

             resolve({ sort: $sort, skip: $skip, limit: $limit, value: categories.slice(0, $limit), count: categories.length })

            }).catch(err => {   reject(err) })
            
    })
}
 

// add tag
const Add = (name) => {

    return new Promise((resolve, reject) => { // check tag

        tagsModel.findOne({}).where("name").equals(name).then(tag => {

            if (tag) {
                reject("the tag already exists")
            } else {

                const newtag = new tagsModel({ name })

                newtag.save()
                    .then(doc => { resolve(doc["_id"]) })
                    .catch(err => { reject(err) })

            }
        }).catch(err => { reject(err) })


    })
}


// edit tag
const Edit = (id , name ) => {

    return new Promise((resolve, reject) => { // update tag

        // check id
        tagsModel.findByIdAndUpdate({}, { name, updatedAt: Date.now() }).where("_id").equals(id)
            .then(tag => {

                if (!tag) {
                    reject("did not match any document")
                } else {
                    resolve("modified")
                }
            }).catch(err => { reject(err) })

    })
}


// remove tag  
const Remove = (id) => {

    return new Promise((resolve, reject) => { // update tag

        // check id
        tagsModel.findByIdAndDelete({}).where("_id").equals(id)
            .then(tag => {

                //check res here
                if (!tag) {
                    reject("did not match any document")
                } else {
                    resolve("removed")
                }
            }).catch(err => { reject(err) })

    })

}



module.exports = { Get , Add , Remove , Edit }