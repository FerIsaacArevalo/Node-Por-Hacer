const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');
//console.log(argv);

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':

        let tareas = porHacer.getListado();

        console.log("====== POR HACER =======".green);
        for (let i = 0; i < tareas.length; i++) {
            console.log(`${i+1}.- Descripcion: ${tareas[i].descripcion}`.yellow);
            console.log(`   Completado: ${tareas[i].completado}`.yellow);
            console.log(" ");
        }

        // for (let tarea of tareas) {
        //     console.log(tarea.descripcion.yellow);
        //     console.log(`   Estado: ${tarea.completado}`.yellow);
        // }
        console.log("========================".green);

        break;
    case 'actualizar':
        let actualizar = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(`La actualizacion de "${argv.descripcion}": ${actualizar}`);
        break;

    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);
        console.log(`Borrar tarea "${argv.descripcion}" es igual a ${borrar} `);
        break;
    default:
        console.log('Comando no es reconocido');
}