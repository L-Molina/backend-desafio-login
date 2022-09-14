const { Router } = require("express");
const login = Router();

//Contenedor
const Contenedor = require("../controller/login.controller");

function auth(req, res, next) {
  console.log(req.session);
  if (req.session.user == "pepe") return next();
  return res.status(401).send("error de autorización");
}

login.get("/", (req, res) => {
  res.render("login");
})

login.post("/", (req, res) => {
  const {username} = req.body;
  Contenedor.save({username})
  .then (user => {
    if (user) {
      req.session.user = user;
      res.redirect("/")
    } else {
			res.send("User o Password incorrectos.")
		}
  })
});

login.get("/privada", auth, (req, res) => {
	res.send("Esta ruta es privada");
});

module.exports = login;