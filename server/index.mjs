import path from 'path';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import './socket.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify();

server.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
});

server.post('/user', (request, reply) => {
    reply.send({ id: 'some-id' });
});

const start = async () => {
    try {
        await server.listen({ port: 9999 });
        console.log('Server started');
    } catch (error) {
        console.error('Error starting server', error);
        process.exit(1);
    }
};

start();