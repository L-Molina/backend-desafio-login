const express = require("express");
const {faker} = require('@faker-js/faker');
const app = express();

//listProducts
const listProducts = async () => {
    try {
        let id = 1;
        const datos = [];
        const cant = 5
        for (let i = 0; i < cant; i++) {
            const dato = {
                id: id++,
                name: faker.vehicle.vehicle(),
                price: faker.commerce.price(1000000, 100000000),
                thumbnail: faker.image.transport()
        }
        datos.push(dato);
      }
    return(datos)
    } catch (err) {
        throw new Error('No se pudo leer la Base de Datos Faker', err)
    }  
}
  
module.exports = { listProducts };