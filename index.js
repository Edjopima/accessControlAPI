const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const knex = require('knex');
require('dotenv').config();
const db =knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : 'access_control'
  }});

// require controllers
const {actions} = require('./controllers/actions');
const {signIn} = require('./controllers/signIn');
const {register} = require('./controllers/register');
// setup express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// endpoints
app.post('/action', (req,res)=> actions(req,res));
app.post('/signin', (req,res)=> signIn(req,res,db,bcrypt));
app.post('/register', (req,res)=> register(req,res,db,bcrypt,salt));
app.post('/delete', (req,res)=>{

});
app.post('/editUser', (req,res)=>{

});
app.listen(process.env.PORT, ()=>{
    console.log(`app is running on port ${process.env.PORT}` );
})
