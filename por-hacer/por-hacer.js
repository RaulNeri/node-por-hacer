const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    //Ejercicio 8. Crear el WriteFile para asignarle el data
    fs.writeFile('db/data.json', data, (err) => {

        if (err) throw new Error('No se pudo grabar')
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = (completado = true) => {
    cargarDB();
    return listadoPorHacer;
    // cargarDB();

    // let index = listadoPorHacer.fill(tarea => tarea.completado === completado);

    // if (index >= 0) {
    //     listadoPorHacer[index].descripcion = descripcion;
    //     return listadoPorHacer;
    // }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    //Valida si la tarea en tal posición ya está completada, si esta completada se guarda.
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

//Ejercicio 9. Función filtrado para eliminar una tarea por hacer
const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}