const mysql2 = require("mysql2/promise");
require("dotenv").config();

    const connection = mysql2.createPool({
     user : process.env.U,
     database : "0320pair",
     password: process.env.PW,
     host : process.env.H,
     port : process.env.P,
     multipleStatements : true
})
    const userInit = async() => {
       try {
            await connection.query("SELECT * FROM users");
        } catch (error) {
            await connection.query("CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, uid VARCHAR(10) NOT NULL, upw VARCHAR(128) NOT NULL, name VARCHAR(10), nick VARCHAR(10),gender VARCHAR(10), imgpath VARCHAR(100)")
            console.log("users 테이블이 없어서 생성했어")
       }

    }
    const boardInit = async() => {
        try {
            await connection.query("SELECT * FROM board");
        } catch (error) {
            await connection.query("CREATE TABLE board(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(30) NOT NULL, content VARCHAR(200) NOT NULL, like INT, imgpath VARCHAR(100)")
            console.log("board 테이블이 없어서 생성했어.")
        }
    }
    userInit();
    boardInit();
module.exports = connection