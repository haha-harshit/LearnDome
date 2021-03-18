const express = require('express');
const app = express();
const port = 8000;

// import the layout-lib
const expressLayouts = require('express-ejs-layouts');

//use static files ---> css/js files 
app.use(express.static('./assets'));

// use a particular layout ---> use it before routes to tell that these routes belong to a particular layout
app.use(expressLayouts);

// use express router
app.use('/', require('./routes/index'));

// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');




app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
 
});