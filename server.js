/** importações */
import express, { json } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

/** setando a porta do servidor */
app.listen(3000)

/** informar ao node que iremos usar json */
app.use(express.json())

/** requiseição GET de testes */
app.get('/usuarios', async (req, res) => {

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                nome: req.query.nome,
                idade: req.query.idade,
                email: req.query.email
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            nome: req.body.nome,
            idade: req.body.idade,
            email: req.body.email
        }
    })
    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            nome: req.body.nome,
            idade: req.body.idade,
            email: req.body.email
        }
    })
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Usuário deletado com sucesso" })
})