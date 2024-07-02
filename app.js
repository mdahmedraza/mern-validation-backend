const express=require('express');
const mongoose=require('mongoose');
const app=express();
const bodyParser=require('body-parser');
const morgan=require('morgan');
const cors=require('cors');

require('dotenv/config');

const validationRoutes=require('./api/routes/validations')

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('db connected....')
}).catch((e)=>{
    console.log('not connected....')
})

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', validationRoutes)

app.use((req, res, next)=>{
    const error=new Error('not found');
    error.status=404
    next(error)
})
app.use((error, req, res, next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })
})
app.listen(8000);