const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();


dotenv.config({path:'./config.env'});
require('./db/conn');
app.use(express.json());
app.use(cors());

const Name=  require('./model/userSchema');
app.use(require('./routers/auth'));
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})