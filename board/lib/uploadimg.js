const multer =require("multer");
const path = require("path");

const upload = multer({
    storage : multer.diskStorage({
        destination : (req,file,cb) => {
            cb(null,path.join(__dirname,"..","upload"))
        },
        filename: (req,file,cb) => {
            const ext = path.extname(file.originalname)
            const imgName = path.basename(file.originalname,ext)
            const imgPath = imgName+Date.now()+ext
            cb(null,imgPath)
        }
    }),
    limits : {fileSize : 5* 1024 * 1024}
});
module.exports=upload