const connetionPool = require("./config");

const createComment = async (id,comment) => {
    try {
      await connetionPool.query("INSERT INTO comment(postid,comment) VALUES(?,?)",[id,comment])
    } catch (error) {
        return console.log(error);
    }
}
const selectDetailContent = async (id) => {
    try {
       const [data] = await connetionPool.query("SELECT board.id as board_id, board.title, board.content, board.imgpath,comment.id as comment_id, comment.comment FROM board left join comment on board.id=comment.postid where board.id=? ",[id])
       return {state: 202, message: "글 조회 성공",data};
    }catch (error) {
     return console.log(error) 
       
    }
}
module.exports = {createComment,selectDetailContent}