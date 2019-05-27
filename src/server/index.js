import express from 'express'
import path from 'path'

const server = express()

server.use(express.static('public'))

server.use((req, res) => res.sendFile(path.resolve('src','web','public', 'index.html')))

server.listen(3001, () => {
  console.log('Listening on 3001')
})
