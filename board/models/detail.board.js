const connetionPool = require("./config");

const selectDetailContent = () => {
    try {
        connetionPool.query("SELECT * FROM board")
    }catch (error) {
     return console.log(error) 
       
    }
}
const createComment = () => {
    connetionPool.query("")
}