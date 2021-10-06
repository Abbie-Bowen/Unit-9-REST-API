'use strict'

const auth = require('basic-auth');
const { User } = require('./models');
const bcrypt = require ('bcrypt');

//Middleware to authenticate the request using Basic Authentication

exports.authenticateUser = async (req, res, next) => {
    let errorMessage;
    console.log(req);
    const credentials = auth(req);
    console.log(credentials);

    if (credentials) {
        const user = await User.findOne({
            where: { emailAddress: credentials.name }
        });
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password); //returns true or false
            if (authenticated) {
                console.log(`Authentication successful. Welcome ${user.firstName} ${user.lastName}.`);

                //store user on the Request object
                req.currentUser = user;
            } else { // if authentication fails
                errorMessage = `Authentication failure for username: ${user.emailAddress}`
            }
        } else { //user not found
            errorMessage = `User not found with email address ${credentials.name}.`
        }
    } else {
        errorMessage = 'Auth header not found.';
    }

    if (errorMessage) {
        console.warn(errorMessage);
        res.status(401).json({ message: 'Access Denied.' })
    } else {
        next();
    }

};