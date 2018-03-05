const express = require('express');
const app=express()
const fs = require("fs")
const path = require("path")


// var mainctrl = require("./controller/mainctrl.js");
// app.get("/",mainctrl.showIndex);
// app.get("/api/indexbanner",mainctrl.indexbanner)
// app.get("/api/waterfall",mainctrl.waterfall)


app.get("/book/booklist",(req,res)=>{
  const dirpath= path.resolve(__dirname,"db/booklist.json")
  fs.readFile(dirpath,(err,doc)=>{
    const result = JSON.parse(doc.toString())
    res.json(result)
  })
})
app.get("/book/bookdetail/:id",(req,res)=>{
  const id=req.params.id;
  const dirpath = path.resolve(__dirname,"db/booklist.json")
  fs.readFile(dirpath,(err,doc)=>{
    const arrbook = JSON.parse(doc.toString()).booklist
    const result = arrbook.filter(item=>item.id==id)[0]
    res.json(result)
  })
})

app.get("/book/bookdir/:id",(req,res)=>{
  const id = req.params.id;
  const dirpath = path.resolve(__dirname,"db/booklist.json");
  fs.readFile(dirpath,(err,doc)=>{
    const arrbook = JSON.parse(doc.toString()).booklist;
    const book = arrbook.filter(item=>item.id==id)[0]
    res.json(book)
  })
})

app.get("/bookread/:id/:chapter",(req,res)=>{
  // const id = url.parse(req.rul,true).query.book;
  // const chapter = url.parse(req.url,true).query.idx;
  console.log(Date.parse(new Date()))
  const id = req.params.id;
  const chapter = req.params.chapter;
  const dirpath= path.resolve(__dirname,"db/book/"+id+".json");
  fs.readFile(dirpath,(err,doc)=>{
    const book=JSON.parse(doc.toString());
    const idx = chapter.toString();
    const result = book[idx]
    console.log(Date.parse(new Date()))
    res.json(result)
  })
})


app.get("/book/filter/:id",(req,res)=>{
  const id=req.params.id;
  console.log(id)
  const dirpath = path.resolve(__dirname,"db/booklist.json")
  fs.readFile(dirpath,(err,doc)=>{
    const arrbook = JSON.parse(doc.toString()).booklist;
    const typ = arrbook.filter(item=>item.id==id)[0].type
    const result = arrbook.filter(item.type==typ)
    console.log(result)
    res.json({result})
  })
})
app.get("/similarfilter",(req,res)=>{
  console.log("book")
  res.json({result:3})
})

app.use(express.static("www"))

app.listen(3000,()=>{console.log("run 3000")})