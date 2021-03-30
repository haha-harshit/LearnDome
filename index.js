const express = require('express');

// cookie-parser
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const app = express();
const port = 8000;

// import the layout-lib
const expressLayouts = require('express-ejs-layouts');

// importing DB
const db = require('./config/mongoose');

// importing express-sessions --- used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


// {MIDDLEWARES}--->
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

//use static files ---> css/js files 
app.use(express.static('./assets'));

// use a particular layout ---> use it before routes to tell that these routes belong to a particular layout
app.use(expressLayouts);

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// making sessions
app.use(session({
    name: 'LearnDome',

    // change the secret before deployment
    secret: 'blahSomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: null
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes/index'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
 
});