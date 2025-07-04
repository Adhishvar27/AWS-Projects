const express=require('express');
const path=require('path');
const cors=require('cors');
const app=express();
const db=require('./database/database');
require('dotenv').config();
require('./modules');
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname,'..','public')));

const userrouter=require('./routers/userRouter');
app.use('/users',userrouter);

const expenseRounter=require('./routers/expenseRouter');
app.use('/expense',expenseRounter);

const paymentRouter=require('./routers/paymentRouter');
app.use('/payment',paymentRouter);

const premiumRouter=require('./routers/premiumRouter');
app.use('/premium',premiumRouter);

const passwordRouter=require('./routers/passwordRouter');
app.use('/password',passwordRouter);

app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','MainPage.html'));
})

db.sync({alter:true}).then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running');
})
}).catch((error)=>{
    console.log(error);
})
