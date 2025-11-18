const mongoose = require('mongoose');


const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({


    
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true,

    },

    div: {
        type: String,
        enum: ["1", "2", "3"],
        required: true
    },


    password: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})


userSchema.pre('save', async function(next){

    const User = this
    
    // hash the password only if it has  been modified ( or is new)

    if(!User.isModified('password')) return next();
    

    try{

        // hash password generation

        const salt = await bcrypt.genSalt(10);
        //hash password

        const hashedPassword = await bcrypt.hash(User.password,salt);

        // overide the plain password with the hashed one

        User.password = hashedPassword

    }

    catch(err){
        return next(err);
    }


})


userSchema.methods.comparePassword = async function (candidatePassword){

    try{

        //use bcrypt to compare the provided password with the hashed password 
        const isMatch = bcrypt.compare(candidatePassword,this.password);

        return isMatch;
    }

    catch (err) {

        throw err;
} 


}








const User = mongoose.model('user',userSchema);

module.exports = User