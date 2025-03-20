const router = require("express").Router()
const { postSelectAllHandler, postSelectHandler, postDeleteHandler,createContentHandeler, postUpdateHandler} = require("../controller/board.controller");
const fs = require("fs");
const upload =require("../lib/uploadimg");

router.get("/",async (req,res)=> {
    const {data} = await postSelectAllHandler(); //{state: 201 , message: "", data}
    res.render("main",{data});
})
router.get("/create",(req,res)=> {
    res.render("create");
})
router.get("/detail", async(req,res)=> {
    const {index} =req.query
    const {data} = await postSelectHandler(index);
    console.log(data);
    res.render("detail",{data});
})
router.get("/delete",async (req,res)=> {
    const {index} =req.query
    await postDeleteHandler(index);
    res.redirect("/");
})
router.get("/edit", async(req,res) => {
    const {index} = req.query
    const {data} = await postSelectHandler(index);
    res.render("edit", {data});
})
router.post("/edit",upload.single("file"), async(req,res) => {
    const {index}=req.query;
    const {title,content}=(req.body)
    const imgpath = "/public/"+req.file.filename
    await postUpdateHandler(title,content,imgpath,index)
    res.redirect("/")
    
})
router.post("/",upload.single("file"),async (req,res)=> {
    const {title,content} = req.body;
    const imgpath = "/public/"+req.file.filename
    await createContentHandeler(title,content,imgpath);
    res.redirect("/");
})
// // /upload/+ 'download1742453677283.jpg'
module.exports=router