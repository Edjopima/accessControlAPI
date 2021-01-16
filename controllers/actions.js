const actions = (req,res) => {
    const {action,uid} = req.body;
    const response = {
        "action":action,
        "uid":uid,
        "name":"Eduardo Piña",
        "result":0,
        "open": 0
    }
    console.log(action,uid);
    switch (action) {
        case 'open':{
        response.open = 1;
         if (uid === " 5B 84 E9 0A"){
            response.result = 1; 
            console.log(response);
            res.status(200).json(response);
        }else{
            response.result = 0;
            response.name = "Tarjeta No Registrada";
            console.log(response);
            res.status(200).json(response);
        }
        break; 
        }
        case 'register':{
            response.open = 0;
            response.result = 1;
            response.name = "Pedro Piña"
            console.log(response);
            res.status(200).json(response);
        }
}
}

module.exports = {actions}
