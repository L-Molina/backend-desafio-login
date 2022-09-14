const {options} = require('../dataBase/options/mariaDB.js');
const knex = require('knex')(options);

//showProducts
const showProducts = async () => {
    try {    
        const productos = await knex
            .from('productos')
            .select('*') 
            .orderBy('price', 'desc') 
        return productos; 
    } catch (err) {
        throw new Error('No se pudo leer la Base de Datos', err)
    }  
}

//saveProducts
const saveProducts = async (product) => {
    try {    
        knex('productos') 
        .insert(product) 
        .then(() => { 
        return ('Producto insertados')})
        .catch((err) => {
            throw new Error('No se pudo leer la Base de Datos', err)
        })
    } catch (err) {
        throw new Error('No se pudo leer la Base de Datos', err)
    }   
}

//getProductById
const getProductById = async (id) => {
    try {
        const producto = await knex
        .from('productos') 
        .select('*') 
        .where({id}) 
        .then((data) => { 
            return data;
        }).catch((err) => {    
            throw new Error('No se pudo leer la Base de Datos', err)
        });
    } catch (err) {
        throw new Error('No se pudo leer la Base de Datos', err)
    } 
}

//deleteProductById
const deleteProductById = async (i) => {
    try {
        knex
        .from('productos') 
        .where('id', '=', i) 
        .del() 
        .then (() => { 
            return('Producto eliminado');  
        }).catch((err) => {
            throw new Error('No se pudo leer la Base de Datos', err)
        })  
    }
    catch (err) {
        throw new Error('No se pudo leer la Base de Datos', err)
    }  
} 

module.exports = { showProducts, saveProducts, getProductById, deleteProductById};