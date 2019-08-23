const fs = require('fs');



let listadoporhacer = [];

const guardarBD = () => {

    let data = JSON.stringify(listadoporhacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar la data en el archivo', err);
        console.log(`Data guardada en: data.json`);
    });
}


const cargarDB = () => {
    try {
        listadoporhacer = require('../db/data.json');

    } catch (error) {
        listadoporhacer = []
    }

}



const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoporhacer.push(porHacer);

    guardarBD();
    return porHacer;

}

const getListado = () => {
    cargarDB();


    return listadoporhacer;
}


const actualizar = (descripcion, completado = true) => {

    cargarDB();
    let index = listadoporhacer.findIndex(tareita => tareita.descripcion === descripcion);

    if (index >= 0) {
        listadoporhacer[index].completado = completado;
        guardarBD();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();
    // let index = listadoporhacer.findIndex(tareita => tareita.descripcion === descripcion);
    // if (index >= 0) {
    //     listadoporhacer.splice(index, 1);
    //     guardarBD();
    //     return true;
    // } else {
    //     return false;
    // }
    //AQUI HAY OTRA FORMA DE RESOLVERLO

    let listadonuevo = listadoporhacer.filter(listado => {
        return listado.descripcion !== descripcion;
    })

    if (listadonuevo.length === listadoporhacer.length) {
        return false;
    } else {
        listadoporhacer = listadonuevo;
        guardarBD();
        return true;
    }



}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}