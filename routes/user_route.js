const express = require('express');

const User = require("../models/user_model");

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send("This is the First API Route");
});

routes.get('/api/auth/signin', (req, res)=> {
    res.send("SignIn Page Route");
});

routes.get('/api/auth/signup', (req, res) => {
    
    res.send("SignUp/Register Page Route");
});

routes.get('/api/files', (req, res)=> {
    res.send("Get All the Files");
});

routes.get('/api/files/:filename', (req, res)=> {
    res.send("Get Specific File");
});


// we have to export the routes 
module.exports = routes;