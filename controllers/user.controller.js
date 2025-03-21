const { userNickSelectAll, userSelectUid, createUser, userInfoEdit } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userNickAll = async () => {
    try {
        return await userNickSelectAll();
    } catch (error) {
        return error;
    }
};

const login = async (uid, upw) => {
    try {
        const data = await userSelectUid(uid);
        if(!data) return {state : 401, message : '아이디가 존재하지 않습니다'};
        const isPasswordCheck = bcrypt.compareSync(upw, data.upw) 
        if(!isPasswordCheck) return {state : 402, message : '비밀번호가 일치하지 않습니다'};
        
        const {nick, imgpath, id} = data;
        const jwtToken = jwt.sign({nick, imgpath, id}, process.env.TOKEN_KEY, {expiresIn : '100m'});
        return {state : 200, message : '로그인 성공', user : { token: jwtToken }};
    } catch (error) {
        return error;
    }
}




const signup = async (uid, upw, name, nick, gender, imgpath) => {
    try {
        const isSignup = await userSelectUid(uid);
        if(isSignup) return {state : 400, message : '이미 가입된 아이디입니다'};

        const pwHash = bcrypt.hashSync(upw, 10);
        const data = await createUser(uid, pwHash, name, nick, gender, imgpath);
        return data;
    } catch (error) {
        return error;
    }
}



const loginToken = (req, res, next) => { // 토큰을 검증하는 미들웨어. 토큰이 유효하면 req.user에 값을 넣어줌
    const data = req.headers.cookie.split("=")[1];
    const userData = jwt.verify(data, process.env.TOKEN_KEY);
    req.user = userData;
    next();
};  


const userEditCheck = async (upw, nick, imgpath, id) => {
    try {
        console.log(imgpath, '나야')
        const pwHash = bcrypt.hashSync(upw, 10);
        await userInfoEdit(pwHash, nick, imgpath, id);
        return {state : 200, message : '수정 완료'};
    } catch (error) {
        return error;
    }
}




module.exports = { userNickAll, login, signup, loginToken, userEditCheck };