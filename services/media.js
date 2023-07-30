const mediaModel = require("../models/media")
const fs = require("fs")

//create Media
const createMedia = (url, type) => {

    return new Promise((resolve, reject) => {

            const newMedia = new mediaModel({ url, type })
 
            newMedia.save().then(doc => {
                resolve(doc._id)
 
            }).catch(err => {

                if (fs.existsSync("./images/" + url)) {
                    fs.unlink("./images/" + url, () => { })
                }

                    reject(err) 
               
            })

    })
}



//get Media
const getMedia = (id) => {

    return new Promise((resolve, reject) => {

        mediaModel.findOne({}).where("_id").equals(id).then(img => {
            
            if (!img) {
                reject("did not match any document")

            } else {
                resolve(img)
            }

        }).catch(err => { reject(err) })

    })
}


module.exports = { createMedia , getMedia }