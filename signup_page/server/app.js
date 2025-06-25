const express=require('express');
const path=require('path');
const cors=require('cors');
const app=express();
const db=require('./database/database');
require('./modules/userTable');
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname,'..','public')));

const userrouter=require('./routers/userRouter');
app.use('/users',userrouter);

app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','frontpage.html'));
})

db.sync({alter:true}).then(()=>{
    app.listen(3000,()=>{
    console.log('Server is running');
})
}).catch((error)=>{
    console.log(error);
})
