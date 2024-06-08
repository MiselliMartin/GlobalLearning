import express from 'express'
import responseTime from 'response-time'
import fs from 'fs';

const app = express()
const PORT = 3000

const PATH_TXT = './requests.txt'

app.use(responseTime((req, res, time) => {
  console.log(new Date())
  console.log(`Tiempo de respuesta para ${req.method} en '${req.url}': ${time.toFixed(3)} milisegundos`);
  console.log("Response: ", res.statusCode);
  fs.appendFileSync(PATH_TXT, `\n{'date':'${new Date()}', 'method': '${req.method}', 'time': '${time.toFixed(3)}ms', 'path': '${req.url}', 'status': '${res.statusCode}'`)
}));

app.get('/', (_req, res) => {
  res.status(200).send()
})

app.get('/holi', (_req, res) => {
  res.status(200).send()
})

app.post('/', (_req, res) => {
  res.status(201).send()
})

app.delete('/', (_req, res) => {
  res.status(204).send()
})



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})