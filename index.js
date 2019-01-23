'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port:3000,
    host:'localhost'
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

(async () => {
    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return h.file('./public/index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/json',
        handler: (req, h) => {
            return h.file('./public/file.json');
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
})();