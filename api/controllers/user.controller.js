const {User} = require('../models/user.model');
const verifySession = require('./verifySession')
const router = require('express').Router();

//sing up
router.post('/users', (req, res) => {
    let body = req.body.user;
    let newUser = User(body)

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        return newUser.generateAccessAuthToken().then((accessToken) => {
            return { accessToken, refreshToken }
        })
    }).then((authToken) => {
        res
            .header('x-refresh-token', authToken.refreshToken)
            .header('x-access-token', authToken.accessToken)
            .send(newUser)
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//Login 
router.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password; 
    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => { 
            return user.generateAccessAuthToken().then((accessToken) => { 
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {  
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e); 
        
    });
})

//change password


//Generate and Return an access tokeke 
router.get('/users/me/access-token', verifySession,(req, res) => { 
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
        
    });
})

module.exports = router;