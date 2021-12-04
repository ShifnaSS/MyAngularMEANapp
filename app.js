const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3300;
let jwt =require('jsonwebtoken');
const bodyparser = require('body-parser');
var app = new express();
const book = require('./src/model/bookmodel');
const author = require('./src/model/authormodel');
const user = require('./src/model/usermode');
app.use(express.static('./dist/Frondend'));
app.use(cors());
app.use(bodyparser.json());

   

function verifyToken(req, res, next) {//token
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    console.log(token)
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    // req.userId = payload.subject
    next()
}

app.post("/api/login",function(req,res){

    let username = 'admin';
    let password = '12345678';
    let userData = req.body;
    console.log(userData)
    console.log(userData.user.user)
    console.log("enterd")
    
    if(username===userData.user.user&&password===userData.user.pass){
        console.log("LOGINusernamepasswordcorect");
        let payload = {subject:username+password}
        let token = jwt.sign(payload,'secretKey')
        let admin ='adminsession';
        res.status(200).send({token,admin});
    }
    else 
    {
        const username = req.body.user.user;
         const password = req.body.user.pass;
         user.findOne({ 'username': username, 'pass1': password })
         .then(function (obj,err) 
         {
            if (obj != null)
             {
                let payload = {subject:username+password}
                let token = jwt.sign(payload,'secretKey')
                let user ='usersession';
                res.status(200).send({token,user});
                console.log(token)
             }
            else{
                let message = 'No User Found'
                res.status(401).send({ message })
            }
        })
    
        .catch((err) => {
        console.log('Error: ' + err);
        })
    }
})

app.get("/api/books",verifyToken,(req,res)=>{
    res.header("Access-Controll-Allow-origin","*");
    res.header("Access control methods: GET,POST,PATCH,PUT,DELETE");
    book.find()
    .then(function(books){
        res.send(books);
    });
})

app.get("/api/authors",verifyToken,(req,res)=>{
    res.header("Access-Controll-Allow-origin","*");
    res.header("Access control methods: GET,POST,PATCH,PUT,DELETE");
    author.find()
    .then(function(authors){
        res.send(authors);
    });
})

app.post("/api/insert",verifyToken,function(req,res){
    res.header("Access-Controll-Allow-origin","*");
    res.header("Access control methods: GET,POST,PATCH,PUT,DELETE");
    var newauthor = {
        authorname : req.body.author.authorname,
        nation : req.body.author.nation,
        genre : req.body.author.genre,
        work  : req.body.author.work,
        image : req.body.author.image
    }
    console.log(newauthor)
    var Item = new author(newauthor);
    Item.save();
})

app.post("/api/newuser",function(req,res){
    res.header("Access-Controll-Allow-origin","*");
    res.header("Access control methods: GET,POST,PATCH,PUT,DELETE");
    var newuser = {
        username : req.body.user.username,
        phone : req.body.user.phone,
        emailID : req.body.user.emailID,
        pass1  : req.body.user.pass1,
        pass2 : req.body.user.pass2
    }
    console.log(newuser)
    var Item = new user(newuser);
    Item.save();
})

app.post("/api/addbook",verifyToken,function(req,res){
    res.header("Access-Controll-Allow-origin","*");
    res.header("Access control methods: GET,POST,PATCH,PUT,DELETE");
    var newbook = {
        bookname : req.body.book.bookname,
        authorname : req.body.book.authorname,
        genre : req.body.book.genre,
        year  : req.body.book.year,
        image : req.body.book.image
    }
    var Item = new book(newbook);
    Item.save();
})
app.delete("/api/remove/:id",verifyToken,(req,res)=>{
   
    id = req.params.id;
    author.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
})
app.delete("/api/removebook/:id",verifyToken,(req,res)=>{
   
    id = req.params.id;
    book.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
})

app.get("/api/:id",verifyToken, (req, res) => {
  
    const id = req.params.id;
      author.findOne({"_id":id})
      .then((author)=>{
          res.send(author);
      });
})

app.get("/api/getbooks/:id",verifyToken, (req, res) => {
  
    const id = req.params.id;
      book.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
})
  
app.put("/api/update",verifyToken,(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    authorname = req.body.authorname,
    nation = req.body.nation,
    genre = req.body.genre,
    work  = req.body.work,
    image = req.body.image
   author.findByIdAndUpdate({"_id":id},
                                {$set:{"authorname":authorname,
                                "nation":nation,
                                "genre":genre,
                                "work":work,
                                "image":image}})
   .then(function(){
       res.send();
   })
 })
 app.put("/api/editbook",verifyToken,(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    bookname = req.body.bookname,
    authorname = req.body.authorname,
    genre = req.body.genre,
    year  = req.body.year,
    image = req.body.image
   book.findByIdAndUpdate({"_id":id},
                                {$set:{"bookname":bookname,
                                "authorname":authorname,
                                "genre":genre,
                                "year":year,
                                "image":image}})
   .then(function(){
       res.send();
   })
 })

 app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frondend/index.html'));
   });

app.listen(port,()=>{console.log("Server Ready at" +port)});