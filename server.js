require('dotenv').config();
const express = require('express');
const path = require('path');
const userRouter = require('./router/user.router');

const app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);



app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});