const categoriesModel = require("../models/categories")
const { OC, FC, QC } = require("../common/getChecker")
   
// get category
const Get = ($sort, $limit, $skip, $filter, $q ) => {

    return new Promise((resolve, reject) => { // get category


        categoriesModel.find({ ...QC("category", $q), ...FC($filter) }, {},OC($skip, null, $sort))
            .then(categories => {

             resolve({ sort: $sort, skip: $skip, limit: $limit, value: categories.slice(0, $limit), count: categories.length })

            }).catch(err => {   reject(err) })
            
    })
}
 

// add category
const Add = (name, description) => {

    return new Promise((resolve, reject) => { // check category

        categoriesModel.findOne({}).where("name").equals(name).then(category => {

            if (category) {
                reject("the category already exists")
            } else {

                const newCategory = new categoriesModel({ name, description })

                newCategory.save()
                    .then(doc => { resolve(doc["_id"]) })
                    .catch(err => { reject(err) })

            }
        }).catch(err => { reject(err) })


    })
}


// edit category
const Edit = (id , name , description) => {

    return new Promise((resolve, reject) => { // update category

        // check id
        categoriesModel.findByIdAndUpdate({}, { name, description, updatedAt: Date.now() }).where("_id").equals(id)
            .then(category => {

                if (!category) {
                    reject("did not match any document")
                } else {
                    resolve("modified")
                }
            }).catch(err => { reject(err) })

    })
}


// remove category  
const Remove = (id) => {

    return new Promise((resolve, reject) => { // update category

        // check id
        categoriesModel.findByIdAndDelete({}).where("_id").equals(id)
            .then(category => {

                //check res here
                if (!category) {
                    reject("did not match any document")
                } else {
                    resolve("removed")
                }
            }).catch(err => { reject(err) })

    })

}



module.exports = { Get , Add , Remove , Edit }