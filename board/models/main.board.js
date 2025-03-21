const connetionPool = require("./config");

const createContent = async (title,content,imgpath) => {
    try {
      await connetionPool.query("INSERT INTO board(title,content,imgpath) VALUES(?,?,?)",[title,content,imgpath])
      return {state : 200, message : "글 추가 성공"};
    } catch (error) {
        return {state:400, message : "글 추가 실패"};
    }
}
const postSelectAll = async () => {
    try {
        const [data] = await connetionPool.query("SELECT * FROM board")
        return {state: 201, message :"전체글 조회 성공", data};
    } catch (error) {
        return {state: 401, message : "글 조회 실패"};
    }
}
const postSelect = async (id) => {
    try {
        const [[data]] = await connetionPool.query("SELECT * FROM board where id=?",[id])
        return {state: 202, message: "글 조회 성공",data};
    } catch (error) {
        console.log(error)
        return {state: 402, message : "해당 글이 없어"};
    }
}
const postUpdate = async (title,content,imgpath,id) => {
    try {
      await connetionPool.query("UPDATE board SET title =?,content=?,imgpath=? where id=?",[title,content,imgpath,id])
      return {state: 203, message: "수정 성공"};
    } catch (error) {
        return {state: 403, message: "수정 실패"};
    }
}
const postDelete = async(id) => {
    try {
       await connetionPool.query("DELETE FROM board WHERE id=?; SET @CNT = 0;UPDATE board SET board.id=@cnt:=@cnt+1;ALTER TABLE board AUTO_INCREMENT=0;",[id]);
       return {state: 204, message:"삭제 성공"};
    } catch (error) {
        return {state: 404, message: "삭제 실패"};
    }
}
module.exports = {createContent,postSelectAll,postSelect,postUpdate,postDelete}