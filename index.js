//console.log("hello word");
const { json } = require('express');
const express = require('express');
const app = express();
const dataService = require('./services/data.service');
app.use(express.json());


// const logMiddleware =(req,res,next)=>{
//     console.log(req.body);
//     next()
// }
// app.use(logMiddleware);
// const authMiddleware=(req,res,next)=>{
//     if(!req.session.currentUser){
//         return  res.json({
//             status:false,
//             statusCode:401,
//             message:"please log In"
//         })
//     }
//     else{
//         next()
//     }
// }

// app.use(session(session){
//     secret:'r'

// })

app.get('/',(req,res)=>{
    res.status(444).send("get method updated")

})

app.post('/',(req,res)=>{
    res.send("post method")

})
app.post('/register',(req,res)=>{
    console.log(req.body);
    const result = dataService.register(req.body.acno,req.body.username,req.body.password)
       console.log(res.send(result.message));
})
   
 app.post('/login',(req,res)=>{
     console.log(req.body);
    const result = dataService.login(req.body.acno,req.body.password)
       console.log(res.send(result.message));

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
