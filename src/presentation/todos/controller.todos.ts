import { Request, Response } from "express"

const todos = [
    {id: 1, completedAt: null, title: 'Buy milk'},
    {id: 2, completedAt: new Date(), title: 'Buy bread'},
    {id: 3, completedAt: null, title: 'Buy beer'},
    {id: 4, completedAt: null, title: 'Buy coffee'},
]

export class TodoController {

    public getTodos = (req: Request, res: Response)=>{
        res.json(todos)
    }

    public getTodoById = (req:Request, res:Response)=>{
        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({message: 'Invalid id'});
        const todo = todos.find(todo=>todo.id === id);
        ( todo )
            ? res.json(todo)
            : res.status(404).json({message: `TODO with id ${id} not found`})
        
    }

    public createTodo = (req:Request, res:Response)=>{

        const {title, completedAt} = req.body;
        if(!title) {
            res.status(400).json({message: 'Title is required'})
            return
        };

        const newTodo = {
            id: todos.length +1,
            completedAt,
            title,
        };

        todos.push(newTodo);
        res.json(todos)

    }

    public updateTodo = (req:Request, res:Response) => {
        
        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({message: 'Invalid id'});

        const todo = todos.find(todo=>todo.id === id);
        if(!todo) {
            res.status(404).json({error: `TODO with id ${id} not found`})
            return
        };
        const {title, completedAt} = req.body;
        todo.title = title || todo.title;
        (completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt)
       

        todo.title = title;
        res.json(todo)
        

    }

    public deleteTodo = (req:Request, res:Response)=>{

        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({message: 'Invalid id'});

        const todo = todos.find(todo=>todo.id === id);
        
        if(!todo) {
            res.status(404).json({error: `TODO with id ${id} not found`})
            return
        };

        todos.splice(todos.indexOf(todo), 1);
        
        res.json({message: 'Todo deleted'})
    }

}