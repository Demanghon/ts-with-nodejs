import { text } from 'body-parser';
import {RequestHandler} from 'express'
import Todo from '../models/Todo'
import _ from 'lodash'

const TODOS:Todo[] =[];

export const createTodo: RequestHandler = (req, res, next) => {
    if(!req.body.text){ return res.status(400).json({message: "text is expected"}); }
    const text = req.body.text;
    let id = _.maxBy(TODOS, function(o) { return o.id; })?.id;
    if (id === undefined){
        id = 0;
    }
    const todo = new Todo(id+1, text);
    TODOS.push(todo);

    return res.status(201).json({message: 'Todo created', todoCreated:todo})
};

export const listTodos: RequestHandler = (req, res, next) => {
    res.json(TODOS)

};

export const updateToto: RequestHandler<{id:number}> = (req, res, next) => {
    if(!req.body.text){ return res.status(400).json({message: "text is expected"});}
    const todo = TODOS.find((value:Todo) => {
        return value.id === req.params.id;
    })

    if (todo){
        todo.text = req.body.text
        return res.status(204).end();
    }else{
        return res.status(404).json({message: "Todo not exists", id: req.params.id})
    }
}

export const deleteTodo: RequestHandler<{id:number}> = (req, res, next) => {
    console.log(`id is ${req.params.id}`);
    const id = req.params.id;
    console.log(`id is ${id}`);
    const todoDeleted = _.remove(TODOS, function(item:Todo) {
        return item.id === req.params.id;
    });
    if (todoDeleted.length === 0){
        return res.status(404).json({message: "Todo not exists", id: req.params.id});
    }else{
        return res.status(204).end();
    }
}