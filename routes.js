'use strict'

const express = require('express');
const { User, Course } = require('./models');
const { authenticateUser } = require('./middleware');

// Construct a router instance
const router = express.Router();

/* ----------- */
/* USER ROUTES */
/* ----------- */

// /users GET current User and return a 200 status code --needs authentication //working
router.get('/users', authenticateUser, async(req, res) => {
    const user = req.currentUser;

    res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
});

// /users POST create a new user, set Location header to '/' and return a 201 status code
router.post('/users', async(req, res) => {
    await User.create(req.body);
    res.status(201).json({"message": "Account successfully created."});
});

/* ------------- */
/* COURSE ROUTES */
/* ------------- */

// /courses GET all courses and the User associated with each course, return 200 status code
router.get('/courses', async(req, res) => {
    const courses = await Course.findAll();
    res.status(200).json({courses});
});

// /courses/:id GET corresponding course including the User associated with that course, return 200 status code
router.get('/courses/:id', async(req, res) => {
    const course = await Course.findOne({
        where: {
            
        }
    })
});
// /courses POST  create a new course, set the Location header to the URI for the new course and return 201 status code and no content --needs authentication

// /courses/:id PUT update the corresonding course and return 204 status code and no content --needs authentication

// /courses/:id DELETE delete the corresponding course and return 204 status code and no content --needs authentication


module.exports = router;