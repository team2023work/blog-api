const multer = require("multer")
const path = require("path")
const fs = require("fs")


String.prototype.replaceAll = function(search, replacement) {
    var target = this
    return target.replace(new RegExp(search, 'g'), replacement)
}

// put single File
const singleMedia = (dest, name) => {

    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => cb(null, dest),
            filename: (req, file, cb) => {

                if (fs.existsSync("./images/" + file.originalname.replaceAll(" ", "_"))) {
                    cb(null, file.originalname.substr(0, file.originalname.lastIndexOf(".")).replaceAll(" ", "_") + "_" + Date.now() + "_" + path.extname(file.originalname))
                } else {
                    cb(null, file.originalname.replaceAll(" ", "_"))
                }

            },
        }),
    }).single(name)

}


module.exports = { singleMedia }