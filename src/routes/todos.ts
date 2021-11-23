import { Router, Request, Response } from 'express';
import {createTodo, listTodos, updateToto, deleteTodo} from '../controllers/todos'

const router = Router();

router.post('/', createTodo);

router.get('/', listTodos);

router.patch('/:id', updateToto);

router.delete('/:id', deleteTodo)

export default router;