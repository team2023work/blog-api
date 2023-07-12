const mongoose = require("mongoose")

const DB_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? process.env.LOCAL_DB_URL : process.env.MONGO_DB_URL
//const DB_URL = "mongodb+srv://admin:admin@cluster0.avixwfy.mongodb.net/zaki"

function Connect(){    

    return mongoose.connect(DB_URL)
    
    .then(() => {
        console.log("db start")

    }).catch(err => {

        console.log("db error")

        console.log(err)
     })

}
 

module.exports = Connect     