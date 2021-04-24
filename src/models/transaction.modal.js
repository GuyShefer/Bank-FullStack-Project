const mongoose = require('mongoose');

const Transaction = mongoose.model('transaction', {
    user_id: {
        type: String,
        trim: true,
        required: true
    },
    operation_type: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = Transaction;