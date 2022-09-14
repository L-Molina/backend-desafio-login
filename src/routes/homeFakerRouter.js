const express = require("express");
const { Router } = require("express");
const homeFaker = Router();

homeFaker.get("/", (req, res) => {  
    res.render('faker'); 
});

module.exports = homeFaker;