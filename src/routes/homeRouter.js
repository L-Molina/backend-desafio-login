const express = require("express");
const { Router } = require("express");
const home = Router();

home.get("/", (req, res) => {  
	if (req.session.user) {
		res.render("home", {user: req.session.user});
	} else {
		res.render("login");
	}
});

module.exports = home;