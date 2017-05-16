import express from 'express'
import path from 'path'

const server = express()

server.use(express.static('public'))

server.use((req, res) => res.sendFile(path.resolve('public', 'index.html')))

server.listen(3030, () => {
  console.log('Listening on 3030...')
})
