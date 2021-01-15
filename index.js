const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post('/action', (req,res)=>{
    const {action,uid} = req.body;
    const response = {
        "action":action,
        "uid":uid,
        "name":"Eduardo Piña",
        "result":0
    }
    console.log(action,uid);
    if (action === 'open' && uid === " 5B 84 E9 0A"){
        response.result = 1; 
        res.status(200).json(response);
    }else{
        response.result = 0;
        response.name = "Tarjeta No Registrada";
        res.status(200).json(response);
    }
})
app.listen(process.env.PORT, ()=>{
    console.log(`app is running on port ${process.env.PORT}` );
})
