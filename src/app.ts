
import express, {Request, Response, NextFunction, response} from "express"
import todosRoutes from './routes/todos'
import createHttpError from 'http-errors';
import {json} from 'body-parser'
import { appendFileSync } from "fs";

const app = express()
const port = 3000

app.use(json())
app.use('/todos', todosRoutes)

//handle 404 error
app.use((req: Request, res:Response, next: NextFunction ) =>{
  next(createHttpError(404))
})

app.use((err:Error, req: Request, res:Response, next: NextFunction ) => {
  res.status(500).json({message: err.message})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})