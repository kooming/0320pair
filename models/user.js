const connectPool = require('./config');

const userNickSelectAll = async () => { // 전체 유저의 닉네임을 조회
    try {
        const [data] = await connectPool.query('SELECT nick, imgpath FROM users');
        console.log(data)
        return data;
    } catch (error) {
        return error;
    }
};

const userSelectUid = async (uid) => { // 유저 정보 조회
    try {
        const [[data]] = await connectPool.query('SELECT * FROM users WHERE uid = ?', [uid]);
        return data;
    } catch (error) {
        return error;
    }
}

const createUser = async (uid, upw, name, nick, gender, imgpath) => { // 유저 정보 생성
    try {
        await connectPool.query('INSERT INTO users (uid, upw, name, nick, gender, imgpath) VALUES (?, ?, ?, ?, ?, ?)', [uid, upw, name, nick, gender, imgpath]);
        return {state : 200, message : '회원가입 성공'};
    } catch (error) {
        return error;
    }
}

const userInfoEdit = async (upw, nick, imgpath, id) => {
    // console.log(id)
    let fieldArr = [];
    let valueArr = [];
    if(upw) {fieldArr.push("upw"); valueArr.push(upw)};
    if(nick) {fieldArr.push("nick"); valueArr.push(nick)};
    if(imgpath) {fieldArr.push("imgpath"); valueArr.push(imgpath)};

    let valueQuery = valueArr.map((el,index)=>`${fieldArr[index]}="${el}"`).join(',') 
    console.log(imgpath)
    console.log(`update users set ${valueQuery} where uid = 123`)
    await connectPool.query (`update users set ${valueQuery} where id = ${id}`);
    // return {state : 200, message : '수정 완료'};






}

module.exports = { userNickSelectAll, userSelectUid, createUser, userInfoEdit };