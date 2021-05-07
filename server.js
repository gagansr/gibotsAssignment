const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute')

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(con => {
    console.log(`DB connected with host ${con.connection.host}`)
}).catch(err => {
    console.error("DB NOT CONNECTED",err);
})
app.use(express.json())
app.use('/',userRoute)


app.listen(process.env.PORT,() => {
    console.log(`Server Live at port ${process.env.PORT}`);
})