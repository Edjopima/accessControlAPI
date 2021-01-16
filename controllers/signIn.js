const signIn = (req,res,db,bcrypt) =>{
    const {user,password} = req.body;
    if (!user||!password){
        res.status(400).json('incorrect form submission');
    }else{
    db.select('user','hash').from('login').where('user','=',user)
    .then(data=>{
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('user', '=', user)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json(err));
        }else{
            res.status(400).json('wrong credentials')
        }
    })} 
}

module.exports = { signIn } 
