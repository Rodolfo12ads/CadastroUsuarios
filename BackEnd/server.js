import express from 'express'
import cors from "cors"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express()
app.use(express.json())
app.use(cors())



app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            nome: req.body.nome,
            age: req.body.age,
            email: req.body.email
        }
    })
})
app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            nome: req.body.nome,
            age: req.body.age,
            email: req.body.email
        }
    })
    res.status(201).json(req.body)
})


// O req é a requisiçao e o res é a resposta da requisiçao 
app.get('/usuarios', async (req, res) => {

    let users = []
    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                nome: req.query.nome
            }
        })
    } else {
        users = await prisma.user.findMany()
    }



    res.status(200).json(users)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Usuario deletado com sucesso" })
})


app.listen(3000) //aviisa qual porta vai rodar o servidor