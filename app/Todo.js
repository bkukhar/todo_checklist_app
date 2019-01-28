const mongoose = require('mongoose');
// const schema = mongoose.Schema;
const todo = new mongoose.Schema({
        name: {
            type: String
        },
        checkMark: {
            type: Boolean
        }
    },
    {
        collection: 'todo-checklist'
    }
);

module.exports = mongoose.model('Todo', todo);