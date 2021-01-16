const register = (req,res,db,bcrypt,salt) => {
    const {name,user,email,password,permissions} = req.body;
    const hash = bcrypt.hashSync(password, salt);
    db.transaction(trx => {
    trx.insert({
        hash: hash,
        user: user
    })
    .into('login')
    .returning('user')
    .then(loginUser => {
        return trx('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            user:loginUser[0],
            permissions:permissions
        })
        .then(user => {
            res.json(user[0]);
        })
    })
    .then(()=>{
        trx.commit();
    })
    .catch((err)=>{
        trx.rollback();
        res.status(400).json(err)
        })
    })
    .catch((err)=>res.status(400).json(err));
}

module.exports = { register }
