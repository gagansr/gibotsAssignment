const express = require('express');
const router = express.Router();
const User = require('../models/User')
const _ = require('underscore-node');


//add user
router.post('/add-user',(req, res) => {
    const {name, age, marks} = req.body;

    if(!name || !age || !marks) {
        return res.status(404).json({
            error : 'Please Provide all details...'
        });
    }
   const user =  User.create({name, age, marks});
   res.status(200).json({
       message : "User Create Successfully",
       
   })
    
})

//get all users
router.get('/',(req, res) => {
    User.find({}).then(function (users) {
        res.status(200).json(users);
        });
})

//get sum of users' marks
router.get('/total-marks',(req,res) => {
    User.find({}, function(err, results){
        if (err) {
         res.status(404).json(err);
        }
     
        let sum = _.reduce(results, function(memo, reading){
             return memo + reading.marks;
             }, 0);
        res.status(200).json({
            Sum : sum
        })
     });
})

//get data based on ascending order of age

router.get('/sort-data',(req, res) => {
    User.find({}).then(function (users) {
            let sortData = [4,6,3,5,1,9];
           
            for(let i = 0; i < users.length; i++) {
                for(let j = 0; j < users.length-1; j++) {
                    let temp = {};
                    if(users[j].age > users[j+1].age) {
                        temp = users[j];
                        users[j] = users[j+1];
                        users[j+1] = temp;
                    }
                }
            }
            res.status(200).json(users);

        });
})




module.exports = router;
