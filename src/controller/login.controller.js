const login = require("../utils/login")

class Contenedor {
    static save(object) {
        return login.saveUser(object);
    }
}

module.exports = Contenedor