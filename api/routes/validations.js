
const express=require('express');
const router=express.Router();
const Validation=require('../models/validation');
const mongoose=require('mongoose');

router.get('/', (req, res, next)=>{
    Validation.find()
    .exec()
    .then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err=>{
        console.log(err);
        res.status(400).json({
            error: err
        })
    })
})
router.post('/', (req, res, next)=>{
    const data=new Validation({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age
    })
    data.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'product post requrest',
            createdData: result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})


module.exports=router;

