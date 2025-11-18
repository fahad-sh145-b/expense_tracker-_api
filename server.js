const express = require('express');


const app = express();


const db = require('./db');

const bodyParser = require('body-parser');


app.use(bodyParser.json());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true })); // ✅ Add this

const PORT = process.env.PORT || 4000





const expenseRoutes = require('./routes/expenseRoutes')


const userRoutes = require('./routes/userRoutes')

app.use('/expense',expenseRoutes);


app.use('/user',userRoutes);


app.listen(PORT,()=>{
    console.log("server is live");
})