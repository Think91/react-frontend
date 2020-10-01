const PORT = process.env.PORT || 3001;
const express = require("express");
const routes = require('./routes');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(express.json());
app.use('/', routes);
app.use(morgan('dev'));

// Error Handlers
app.use((err, req, res, next) => {
    console.warn(err.stack);
    res.status(500).send("Something broke!");
});


// Establishing Port
app.listen(PORT, () => console.log(`Server is Listening at port: ${PORT}`));