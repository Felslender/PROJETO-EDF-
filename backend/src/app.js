const express = require('express');
const app = express();
const cors = require('cors');


const routerAluno = require('./routers/routerAluno');
const routerLogin = require('./routers/routerLogin');

app.use(express.json());
app.use(cors());

app.use(routerAluno);
app.use(routerLogin);


module.exports = app;
