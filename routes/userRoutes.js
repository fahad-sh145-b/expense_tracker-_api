const express = require('express');

const router = express.Router();

const User = require('../models/user');

const {jwtAuthmiddleware,generatetoken} = require('./../jwt')









router.post('/signup',async(req,res)=>{


    try{

        const data = req.body

        const newuser = new User(data);

        const response = await newuser.save();

        console.log("data saved");


        const payload = { 

            id:response.id

        }

        console.log(JSON.stringify());

        const token = generatetoken(payload);

        console.log('Token is ',token)
       return res.status(201).json({response:response , token:token})
    }

    catch(err){
        console.log(err);
        return res.status(500).json({error:'invalid server error'})
    }

})





router.post('/login',async (req,res)=>{


    try{


        const { name ,password } = req.body;


        const foundUser = await User.findOne({name:name});

        if(!foundUser || !(await foundUser.comparePassword(password))){

            return res.status(401).json({error:'invalid username or password'});
        }


        const payload = {

            id:foundUser.id,
            //  name: foundUser.name

        }

        const token = generatetoken(payload);

        return res.json({token})


    }



     catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'internal server error' });

    }
})







router.get('/profile',jwtAuthmiddleware,async(req,res)=>{

    try{

        const userId = req.user.id

        const foundUser = await User.findById(userId);

        if(!foundUser){
            return res.status(404).json({error:'user not found'})
        }

        res.status(201).json({foundUser});

    }
      catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'internal server error' });

    }
})


router.get('/', jwtAuthmiddleware, async(req,res)=>{

    try{

        const response = await User.find();

        console.log("data saved");

        res.status(201).json({response})
    }

     catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'internal server error' });

    }
})
module.exports = router;