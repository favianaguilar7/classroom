const morgan = require('morgan');
const express = require('express');

const app = express();
const user = require('./routes/user');
const cors = require('./middlewere/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", user);

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...");
});