const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    _instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    },

    _student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;