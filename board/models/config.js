const mysql2 = require("mysql2/promise");

const connetionPool = mysql2.createPool({
    user : process.env.DATABASE_USER,
    database : "0320pair",
    password : process.env.DATABASE_PASSWORD,
    port : process.env.DATABASE_PROT ,
    host : process.env.DATABASE_HOST,
    multipleStatements : true
});

connetionPool.getConnection((error)=> {
    console.log(error)
})

const init = async () => 
    {try {
        await connetionPool.query("SELECT * FROM board")
        console.log("테이블이 있어")
    } catch (error) {
        await connetionPool.query("CREATE TABLE board(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(30) NOT NULL, content VARCHAR(150) NOT NULL, imgpath VARCHAR(150));")
        console.log("테이블이 없어서 만들었어.")
    }

}
const commentInit = async () => {
    try {
        await connetionPool.query("SELECT * FROM comment")
    } catch (error) {
        await connetionPool.query("CREATE TABLE comment(id INT AUTO_INCREMENT PRIMARY KEY, postid INT, comment VARCHAR(150),CONSTRAINT fk_board_id FOREIGN KEY (postid) REFERENCES board(id) ON DELETE CASCADE)")
    }
}
init();
commentInit();


module.exports = connetionPool;