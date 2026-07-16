import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import connectMongo from './db/mongo.js';
import middlewarePlugin from "./middleware/middleware.js";
import userPlugin from './routes/user.js';
import pokemonPlugin from './routes/pokemon.js';

dotenv.config();

const server = Hapi.server({
    port: process.env.PORT || 8000,
    routes: {
        cors: {
            origin: ['*'],
            headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
            additionalHeaders: ['X-Requested-With']
        }
    }
});

server.events.on('response', function (request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path + ' --> ' + request.response.statusCode);
});

server.route({
    method: 'GET',
    path: '/',
    handler: function () {
        return 'Testing Hapi Server!';
    }
});

const init = async () => {
    await server.register({
        plugin: middlewarePlugin
    });
    await server.register(userPlugin, {
        routes: {
            prefix: '/auth'
        }
    });
    await server.register(pokemonPlugin, {
        routes: {
            prefix: '/pokemon'
        }
    });

    await connectMongo();
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
