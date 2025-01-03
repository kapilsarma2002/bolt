import express from 'express'
import templateRouter from './routes/template'
import chatRouter from './routes/chat'

const app = express()
const PORT = 3000

app.use(express.json())
app.use((req, res, next) => {
  res.appendHeader('Content-Type', 'application/json')
  next()
})

app.use('/template', templateRouter)
app.use('/chat', chatRouter)

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})
