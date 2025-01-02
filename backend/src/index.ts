import express from 'express'
import templateRouter from './routes/template'

const app = express()
const PORT = 3000

app.use(express.json())
app.use((req, res, next) => {
  res.appendHeader('Content-Type', 'application/json')
  next()
})

app.use('/template', templateRouter)

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})
