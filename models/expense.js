
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const expenseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },


    defaultAt: {
        type: Date,
        default: Date.now
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})







const Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense