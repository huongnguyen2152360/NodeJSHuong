// Lay thu vien express
const express = require('express');
// Khoi tao router
const router = express.Router();

// Lay 2 model Todo va Task
const Todo = require('../models/Todo');
const Task = require('../models/Task');

// Insert - Them du lieu bang POST
router.post('/', async(req,res) => {
    // Trich xuat du lieu tu req.body (req.body.name, ...)
    let { name, priority, description, duedate } = req.body;
    try {
        // Them du lieu bang lenh model.create()
        const newTodo = await Todo.create(
            {
                name,
                priority: parseInt(priority), // Chuyen sang so nguyen
                description,
                duedate
            }, 
            // Lay 1 vai truong info de hien thi thoi
            {
                fields: ['name', 'priority', 'description', 'duedate']
            }
        );
        // Neu newTodo co du lieu => hien thi cho client
        if(newTodo) {
            res.json ({
                result: 'ok',
                data: newTodo,
                message: 'Add new Todo successfully!'
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Add new Todo failed.'
            });
        }
    } catch(error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Add new Todo failed. Error: ${error}.`
        });
    }
});

// Sua du lieu - PUT
router.put('/:id', async(req,res) => {
    // Trich xuat id
    const {id} = req.params;
    // Trich xuat du lieu tu req.body (req.body.name)
    let { name, priority, description, duedate } = req.body;
    try {
        // model.findAll attributes
        let todos = await Todo.findAll(
            {
                attributes: ['id', 'name', 'priority', 'description', 'duedate'],
                where: {
                    id
                }
            }
        );
        // Neu todos co du lieu roi -> update -> hien thi cho client
        if(todos.length > 0) {
            todos.forEach(async (todo) => {
                await todo.update({
                    name: name ? name: todo.name,
                    priority: priority ? priority: todo.priority,
                    description: description ? description: todo.description,
                    duedate: duedate ? duedate: todo.duedate
                })
            });
            res.json({
                result: 'ok',
                data: todos,
                message: 'Update Todo successfully!'
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Update Todo failed.'
            });
        }

    } catch(error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Update Todo failed. Error: ${error}.`
        });
    }
});

// Delete du lieu
router.delete('/:id', async(req,res) => {
    // Trich xuat id
    const {id} = req.params;
    try {
        // Delete Task truoc
        await Task.destroy({
            where: {
                listid: id //listid cua Task la id cua Todo
            }
        });
        // Bay gio xoa Todo
        let numberofRowsDeleted = await Todo.destroy({
            where: {
                id
            }
        });
        // Xoa xong thi hien thi cho client
        res.json({
            result: 'ok',
            message: 'Delete Todo successfully!',
            count: numberofRowsDeleted
        });
    } catch(error) {
        res.json({
            result: 'failed',
            message: `Delete Todo failed. Error: ${error}.`,
            data: {}
        });
    }
});

// Lay du lieu (thong thuong)
router.get('/',async(req,res) => {
try {
    const todos = await Todo.findAll({
        attributes: ['id', 'name', 'priority', 'description', 'duedate'],
    });
    res.json({
        result: 'ok',
        data: todos,
        message: 'Query Todo successfully!'
    });
} catch(error) {
    res.json({
        result: 'failed',
        data: {},
        message: `Query Todo failed. Error: ${error}.`
    });
}
});

// Lay du lieu bang id
router.get('/:id', async(req,res) => {
    const {id} = req.params;
    try {
        let todos = await Todo.findAll({
            attributes: ['id', 'name', 'priority', 'description', 'duedate'],
            where: {
                id
            },
            include: { // Include them cac Task tuong ung vs id
                model: Task,
                as: 'tasks',
                require: false
            }
        });
        // Neu todos co du lieu -> hien thi thong bao succesful cho client
        if(todos.length > 0) {
            res.json({
                result: 'ok',
                data: todos,
                message: 'Query Todo successfully!'
            });
        } else {
            res.json({
                result: 'ok',
                data: {},
                message: 'Query Todo failed.'
            });
        }
    } catch(error) {
        res.json({
            result: 'ok',
            data: {},
            message: `Query Todo failed. Error: ${error}.`
        });
    }
});

module.exports = router;