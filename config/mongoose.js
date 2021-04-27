
const mongoose = require('mongoose');

const env = require('./environment');

// connecting DB 
mongoose.connect(`mongodb://localhost/${env.db}`, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to DB!"));

db.once('open', function(){
    console.log('Connected to MongoDB');
});

module.exports = db; 