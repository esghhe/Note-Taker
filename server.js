// Dependencies
const express = require("express");

// Express configuration tells node that we are creating an 'express server
const app = express();

// sets an install port.
const PORT = process.env.PORT || 3000;

// Setting up the Express app to handle data parsing
app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});