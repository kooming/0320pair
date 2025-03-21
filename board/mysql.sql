CREATE TABLE board(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(30) NOT NULL, content VARCHAR(150) NOT NULL, writer VARCHAR(15) DEFAULT "ming");

INSERT INTO board(title,content) VALUES("제목","내용");
INSERT INTO board(title,content,writer) VALUES("제목","내용","이수호");
SELECT * FROM board;
SELECT * from board WHERE id=1;

UPDATE BOARD SET title= "제목123", content= "내용123" WHERE id=1;

DELETE FROM board WHERE id=1;

SET @CNT = 0; 
UPDATE board SET board.id=@cnt:=@cnt+1;
ALTER TABLE board AUTO_INCREMENT=0;

CREATE TABLE comment(id INT AUTO_INCREMENT PRIMARY KEY, postid INT, comment VARCHAR(150),CONSTRAINT fk_board_id FOREIGN KEY (postid) REFERENCES board (id))



SELECT board.id as board_id, board.title, board.content, comment.id as comment_id, comment.comment FROM board left join comment on board.id=comment.postid where board.id=1
