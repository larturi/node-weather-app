const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {

        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 3,
                name: `${'0.'.green} Salir`
            },
        ]

    }
];

const inquirerMenu = async () => {

    console.clear();

    console.log('===================================='.green);
    console.log('       Seleccione una opción:'.green);
    console.log('====================================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;

};

const pausa = async () => {

    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]

    console.log('\n');
    await inquirer.prompt(pregunta);

};

const leerInput = async ( message ) => {

    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                } else {
                    return true;
                }
            }
        }
    ];

    const { desc } = await inquirer.prompt(pregunta);
    return desc;

};

const listarLugares = async (lugares = []) => {

    const choices = lugares.map( (lugar, i) => {

        let idx = `${i + 1}.`.green;

        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }

    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione',
            choices  
        }
    ];
    
    const { id } = await inquirer.prompt(preguntas);

    return id;

};

const confirmar = async (message) => {

    const question = [{    
            type: 'confirm',
            name: 'ok',
            message
     }];

    const { ok } = await inquirer.prompt(question);
    return ok;

};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar
};