import express from 'express';
const router = express.Router();

//Import 2 model
import Todolist from '../models/Todolist';
import Tasklist from '../models/Tasklist';
import {Op} from '../databases/database';

//Validate bang thu vien validator (Import validator)
import {isNumeric, isEmpty, isBoolean, isInt, toDate} from 'validator';

// Get data
router.get('/get', async(req,res) => {
    const todos = await Todolist.findAll({
        attributes: ['id','name','priority','description','duedate']
    });
    try {
        res.json({
            result: 'ok',
            data: todos,
            message: 'Query Todolist successfully!'
        });
    } catch(error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Todolist failed. Error: ${error}.`
        });
    }
});

// Get data by id 
router.get('/:id', async(req,res) => {
    const {id} = req.params;
    const todoWTask = await Todolist.findOne({
        // attributes: ['id','name','priority','description','duedate'],
        where: {
            id
        },
        include: {
            model: Tasklist,
            as: 'tasklists',
            required: false
        }
    });
    try {if(todoWTask) {
        res.json({
            result: 'ok',
            data: todoWTask,
            message: 'Query Todolist successfully!'
        });
    } else {
        res.json({
            result: 'failed',
            data: {},
            message: 'Query Todolist failed.'
        })
    }
} catch(error) {
    res.json({
        result: 'failed',
        data: {},
        message: `Query Todolist failed. Error: ${error}.`
    });
}
});

// Get by name

router.get('/findname/:name',async(req,res) => {
    const {name} = req.params;
    const findNameStartsWith = await Todolist.findAll({
        where: {
            name: {
                [Op.iLike]: name + '%'
            }
        }
    })
    try {
        res.json({
            result: 'ok',
            data: findNameStartsWith,
            message: 'Query name successfully!'
        });
    } catch(error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query name failed! Error: ${error}.`
        });
    }
});

// Get by name - Like a search bar
router.post('/findname',async(req,res) => {
    const {name1} = req.body;
    const findNameStartsWith = await Todolist.findAll({
        where: {
            name: {
                [Op.iLike]: name1 + '%'
            }
        }
    })
    try {
        res.json({
            result: 'ok',
            data: findNameStartsWith,
            message: 'Query name successfully!'
        });
    } catch(error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query name failed! Error: ${error}.`
        });
    }
});

// Insert - Them todo
router.post('/addtodo',async(req,res) => {
    const {name,priority,duedate,description} = req.body;
    const addTodo = await Todolist.create({
        name,
        priority,
        description,
        duedate
    }, {
        fields: ['name','priority','description','duedate']
    });
    if (isEmpty(name) || !isInt(priority, {min: 0, max: 4}) || toDate(duedate) === null) {
        res.json({
            result: 'failed',
            data: {},
            message: `name must not be empty, priority 0..4 duedate must be yyyy-mm-dd`
        });
        return;
    }
    try {
        res.json({
            result: 'ok',
            data: addTodo,
            message: 'Add Todo successfully!'
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Add Todo failed! Error: ${error}.`
        });
    }
});

//Sua todo
router.put('/updatetodo',async(req,res) => {
    const {id,name,priority,duedate,description} = req.body;
    await Todolist.update({
            name,
            priority,
            description,
            duedate
    }, {
        where: {
            id
        }
    }
);
    const findUpdatedTodo = await Todolist.findOne({
        where: {
            id
        }
    });
try {
    res.json({
        result: 'ok',
        data: findUpdatedTodo,
        message: 'Update Todo successfully!'
    });
} catch (error) {
    res.json({
        result: 'failed',
        data: {},
        message: `Update Todo failed! Error: ${error}.`
    });
}
});

//Delete Todo
router.delete('/delete',async(req,res) => {
    const {id} = req.body;
    const deleteTodo = await Todolist.destroy({
        where: {
            id
        }
    }
);
try {
    res.json({
        result: 'ok',
        data: deleteTodo,
        message: 'Delete Todo successfully!'
    });
} catch (error) {
    res.json({
        result: 'failed',
        data: {},
        message: `Delete Todo failed! Error: ${error}.`
    });
}
});

module.exports = router;