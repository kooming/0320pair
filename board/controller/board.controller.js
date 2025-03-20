const {createContent,postDelete,postSelect,postSelectAll,postUpdate}=require("../models/board");

const createContentHandeler = async (title,content,imgpath) => {
    try {
        const data =await createContent(title,content,imgpath);
        return data;
    } catch (error) {
        console.log(error);
        return error
    }
}
const postSelectAllHandler = async () => {
    try {
        const data = await postSelectAll()
        return data;
    } catch (error) {
        return error;
    }
}
const postSelectHandler = async (id) => {
    try {
        const data = await postSelect(id)
        return data;
    } catch (error) {
        return error;
    }
}
const postUpdateHandler = async (title,content,imgpath,id) => {
    try {
        const data = await postUpdate(title,content,imgpath,id)
        return data;
    } catch (error) {
        return error;
    }
}
const postDeleteHandler = async (id) => {
    try {
        const data = await postDelete(id);
        return data;
    } catch (error) {
        return error;
    }
}
module.exports = {createContentHandeler,postSelectAllHandler,postSelectHandler,postUpdateHandler,postDeleteHandler}