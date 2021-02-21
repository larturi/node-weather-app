const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

require('dotenv').config();

const main = async () => {

    let opt;

    const busquedas = new Busquedas();

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad:');

                // Buscar lugares
                const lugares = await busquedas.ciudad(termino);

                // Seleccionar lugar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find( lugar => lugar.id === id);

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:');
                console.log('Mínima:');
                console.log('Máxima:');
            break;

            case 2:
                console.log('Historial');
            break;

        }

        if(opt !== 0) await pausa();

    } while (opt !== 0)

};

main();