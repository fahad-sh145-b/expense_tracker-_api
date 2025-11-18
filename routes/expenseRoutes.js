const express = require('express');

const router = express.Router();

const Expense = require('../models/expense');

const mongoose = require('mongoose');

const { jwtAuthmiddleware, generatetoken } = require('./../jwt')



router.post('/', jwtAuthmiddleware, async (req, res) => {


    try {

        const userId = req.user.id

        const { title, amount, category, date } = req.body;

        if (!amount) {
            return res.status(401).json({ error: 'amount not found' })
        }

        const newexpense = new Expense({
            title,
            amount: Number(amount),
            category,
            date: date ? new Date(date) : Date.now(),
            user: userId
        });

        const response = await newexpense.save();

        console.log("expense created")

        res.status(201).json({ response });


    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'invalid server error' })
    }
})


//  GET ALL EXPENSES (for the logged-in user)

router.get('/', jwtAuthmiddleware, async (req, res) => {

    try {

        const userId = req.user.id

        const countallexpe = await Expense.find({ user: userId }).sort({ date: -1 });


        if (countallexpe.length === 0) {
            return res.status(404).json({ error: 'expense not found' })
        }


        res.status(200).json({ countallexpe });
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'invalid server error' })
    }
})


router.get('/summary', jwtAuthmiddleware, async (req, res) => {

    try {


        const userId = req.user.id


        const summary = await Expense.aggregate([

            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId)
                }
            },

            {
                $group: {

                    _id: '$category',
                    totalamount: { $sum: '$amount' },
                    count: { $sum: 1 }



                }
            }
        ]);

        // Total count of all expenses

        const totalcount = await Expense.countDocuments({ user: userId })

        // Total amount of all expenses

        const totalamount = await Expense.countDocuments({ user: userId })


        res.status(200).json({ summary, totalcount, totalamount });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'invalid server error' })
    }


})


// GET SINGLE EXPENSE

router.get('/:id', jwtAuthmiddleware, async (req, res) => {

    try {


        const userId = req.user.id
        const expesId = req.params.id


        if (!mongoose.Types.ObjectId.isValid(expesId)) {

            return res.status(400).json({ error: 'invalid expense id' })
        }


        const getsingexpe = await Expense.findOne({ _id: expesId, user: userId });

        if (!getsingexpe) {
            return res.status(404).json({ error: 'expense not found' })
        }

        return res.status(200).json({ getsingexpe });
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'invalid server error' })
    }
})




    
//update expense

router.put('/:id', jwtAuthmiddleware, async (req, res) => {

    try {

        const userId = req.user.id
        const expesId = req.params.id


        if (!mongoose.Types.ObjectId.isValid(expesId)) {

            return res.status(400).json({ error: 'invalid expense id' })
        }

        const { title, amount, category, date } = req.body;

        const updateexpense = await Expense.findOneAndUpdate(
            { _id: expesId, user: userId },
            { title, amount, category, date },
            { new: true }
        );

        if (!updateexpense) {
            return res.status(404).json({ error: 'expense not update' })
        }

        res.status(200).json({ updateexpense })
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'invalid server error' })
    }
})


//delete expense


router.delete('/:id', jwtAuthmiddleware, async (req, res) => {

    try {


        const userId = req.user.id

        const expesId = req.params.id


        if (!mongoose.Types.ObjectId.isValid(expesId)) {

            return res.status(400).json({ error: 'invalid expense id' })
        }



        const deltexpen = await Expense.findOneAndDelete({ _id: expesId, user: userId })

        if (!deltexpen) {
            return res.status(404).json({ error: 'expense not found' })
        }

        return res.status(200).json({ error: 'expense delete successfully' })
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'invalid server error' })
    }
})






module.exports = router