import { fastify } from 'fastify' //Framework HTTP
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

const  database = new DatabasePostgres()

// GET, POST, PUT, DELETE, PATCH
//Request Body

//POST Criar videos
server.post('/videos', async (request, reply) =>{

    const { title, description, duration } = request.body

    await database.create({
        title: title,  
        description: description,
        duration: duration,
    })


    return reply.status(201).send()
})

//GET Listar videos
server.get('/videos', async (request, reply) => {
    const search = request.query.search
    
    const videos = await database.list(search)

    return videos
})

//PUT Atualizar video
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

//Delete deleta video
server.delete('/videos/:id', async (request, reply) =>{
    const videoId = request.params.id
    
    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: 'https://127.0.0.1',
    port:process.env.PORT ?? 3333
})