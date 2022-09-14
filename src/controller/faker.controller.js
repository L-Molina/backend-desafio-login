const productosFaker = require("../utils/productosFaker")

class Contenedor { 
    static list() {
        return productosFaker.listProducts();
    }    
} 
  
module.exports = Contenedor;