const router = require('express').Router();
const {upload} = require('../lib/imgUpload');
const {userNickAll, login, signup, loginToken, userEditCheck} = require('../controllers/user.controller');
const { userInfoEdit } = require('../models/user');

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});





router.post('/login', async (req, res) => { // 로그인 요청을 처리하는 라우터. 로그인 성공 시 토큰을 발급하고 쿠키에 저장. 이후 마이페이지로 get 요청을 보냄 
    const { uid, upw } = req.body;
    const data = await login(uid, upw);
    if(data.state === 200) {
        const { token } = data.user;
        res.cookie('login-token', token, {
            maxAge : 10 * 60 * 60* 1000,
            httpOnly : true
        });
        res.json({ state : 200, message: data.message});
    } else {
        res.json({ state : data.state, message: data.message});
    }

});

// const loginToken = (req, res, next) => { // 토큰을 검증하는 미들웨어. 토큰이 유효하면 req.user에 값을 넣어줌
//     console.log(req.headers.cookie);
//     const data = req.headers.cookie.split("=")[1];
//     req.user = jwt.verify(data, process.env.TOKEN_KEY);
//     next();
// };  

router.get('/mypage', loginToken, (req, res) => {
    console.log(req.user);
    const {nick, imgpath, id} = req.user; // req.user는 loginToken에서 넣어준 값
    res.render('mypage', {nick, imgpath, id});
});

router.post('/signup', upload.single('image'), async (req, res) => {
    const { uid, upw, name, nick, gender } = req.body;
    const {path} = req.file
    const data = await signup(uid, upw, name, nick, gender,'/' + path);
    res.json(data);
});

router.get('/user_edit', loginToken, (req, res) => {
    res.render('user_edit');
});

router.post('/user_edit', loginToken, upload.single('profImg'), async (req, res) => {
    const {upw, nick, id} = req.body
    if(req.file){
        const {path} = req.file
        const data = await userEditCheck(upw, nick, '/' + path, id);
        res.json(data);
        // res.setCookie
    } else {
        console.log(id)
        const data = await userEditCheck(upw, nick, null, id);
        res.json(data);
    }
});




module.exports = router;