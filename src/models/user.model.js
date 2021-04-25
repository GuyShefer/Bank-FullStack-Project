const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email required"],
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: true
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
    isActive: {
        type: Boolean,
        default: true
    }
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.find({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
}

// hash password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;