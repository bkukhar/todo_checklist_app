'use strict';

const express = require('express');
const todoRoutes = express.Router();
const Todo = require('./Todo');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// addTodo
todoRoutes.route('/todo').post(function (req, res) {
    const Joi = require('joi');
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(50).required()
    });
    const data = req.body;

    Joi.validate(data, schema, (err) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: 'Invalid request data: todo name was not entered or shorter than 3 symbols',
                data: data
            });
        } else {
            Todo.create(
                {
                    name: req.body.name,
                    checkMark: false
                },
                function (error, todo) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Todo was created successfully',
                        data: todo
                    });
                })
        }
    });
});

// removeTodo
todoRoutes.route('/todo/:id').delete(function (req, res) {
    const id = req.params.id;
    Todo.findOneAndDelete({_id: id}, function (err, todo) {
        if (!todo) {
            res.status(400).json({
                status: 'error',
                message: 'Todo item with this id cannot be found'
            })
        } else {
            res.json('Todo item was successfully removed: ' + todo)
        }
    })
});

// getTodos
todoRoutes.route('/todo').get(function (req, res, next) {
    Todo.find(function (err, todos) {
        if (err) {
            return next(new Error(err))
        }
        res.json(todos)
    })
});

// markDone/Undone
todoRoutes.route('/todo/:id').put(function (req, res) {
    const id = req.params.id;
    Todo.findOne({_id: id})
        .then(todo => {
            if (!todo) {
                res.status(400).json({
                    status: 'error',
                    message: 'Todo item with this id cannot be found'
                })
            } else {
                Todo.findById(id, function (error, todo) {
                    const change = todo.checkMark;
                    todo.checkMark = !change;
                    todo.save({
                        function (error, todo) {
                            if (error) {
                                res.status(400).send('Cannot update todo')
                            } else {
                                res.status(200).json(todo)
                            }
                        }
                    });

                    res.status(200).json({
                        status: 'success',
                        message: 'Todo was updated successfully',
                        data: todo
                    });
                });
            }
        })
});

module.exports = todoRoutes;