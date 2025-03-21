const {createComment,selectDetailContent} = require("../models/detail.board");

const createCommentHandler = async (id,comment) => {
    try {
        const data = await createComment(id,comment);
        return data;
    } catch (error) {
        return console.log(error);
    }
}
const selectDetailHandler = async (id) => {
    try {
        const data = await selectDetailContent(id);
        return data;
    } catch (error) {
        return console.log(error);
    }
}
module.exports = {createCommentHandler,selectDetailHandler}