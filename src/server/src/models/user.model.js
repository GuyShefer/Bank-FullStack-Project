const mongoose = require('mongoose');

const User = mongoose.model('user', {
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email required"],
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    cash: {
        type: Number,
        default: 0
    },
    credit: {
        type: Number,
        min: 0,
        default: 0
    },
    isActive : {
        type: Boolean,
        default: true
    }
})

module.exports = User;