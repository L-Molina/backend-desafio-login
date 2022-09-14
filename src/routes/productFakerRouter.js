const express = require("express");
const { Router } = require("express");
const productosFaker = Router();

const Contenedor = require("../controller/faker.controller")

productosFaker.get("/", (req, res) => { 
    Contenedor.list()
    .then((data) => {      
      res.status(200).send(data); 
    })
});

module.exports = productosFaker;