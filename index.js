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

                if (id === '0') continue;
                
                const lugarSel = lugares.find( lugar => lugar.id === id);
                busquedas.agregarHistorial(lugarSel.nombre);

                // Info Clima
                const clima = await busquedas.getClimaCiudad(lugarSel.lat, lugarSel.lng);

                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('El clima está...', clima.desc);
            break;

            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ lugar }`);
                });
            break;

        }

        if(opt !== 0) await pausa();

    } while (opt !== 0)

};

main();