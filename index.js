//console.log("hello word");
const { json } = require('express');
//const db =require('./services/db');
const session =require('express-session');
const express = require('express');
const cors =require('cors');
const app = express();
const dataService = require('./services/data.service');
app.use(express.json());
let currentuser;
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false}))


const logMiddleware =(req,res,next)=>{
    console.log(req.body);
    next()
}
//app.use(logMiddleware);

const authMiddleware=(req,res,next)=>{
    console.log(req.session.currentuser);
    if(!req.session.currentuser){
        return res.json({
            status:false,
            statusCode: 401,
            message:"please log In"
        })
    }
    else{
        next()
    }
}

app.get('/',(req,res)=>{
    res.status(444).send("get method updated")

})

app.post('/',(req,res)=>{
    res.send("post method")

})
app.post('/register',(req,res)=>{
    //console.log(req.body);
    dataService.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{res.status(result.statusCode).json(result)});
})
   
 app.post('/login',(req,res)=>{
     //console.log(req.body);
    dataService.login(req,req.body.acno,req.body.password)
       .then(result=>{res.status(result.statusCode).json(result)});

})

app.post('/deposit',authMiddleware,(req,res)=>{
    console.log(req.session.currentUser);
    //console.log(req.body);
   dataService.deposit(req.body.acno,req.body.password,req.body.amount)
      .then(result=>{
          res.status(result.statusCode).json(result)});

})
app.post('/withdraw',authMiddleware,(req,res)=>{
    //console.log(req.body);
   dataService.withdraw(req,req.body.acno,req.body.password,req.body.amount)
      .then(result=>{res.status(result.statusCode).json(result)});

})

app.delete('/deleteAccDetails/:acno',(req,res)=>{
    dataService.deletAccDetails(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    //res.send("delet method haii")
})


app.put('/',(req,res)=>{
    res.send("put method")

})
app.patch('/',(req,res)=>{
    res.send("patch method")

})
app.delete('/',(req,res)=>{
    res.send("delet method haii")

})

app.listen(3000,()=>{
    console.log("server started at port 3000")
})
