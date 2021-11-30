
require('dotenv').config();

const port = process.env.APP_PORT;
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const app = express();
const appConfigs = require('./config/app');

const cors = require('cors');
app.use(cors());
// TODO: setup CORS policies
// const allowedOrigins = [
//     'http://localhost:3000',
//     'http://igrodrom-web.site'
// ];
// app.use(cors({
//     origin: function(origin, callback){
//         // allow requests with no origin
//         // (like mobile apps or curl requests)
//         if(!origin) return callback(null, true);
//         if(allowedOrigins.includes(origin)) {
//             return callback(null, true);
//         } else {
//             const msg = "The CORS policy for this site does not allow access from the specified Origin.";
//             return callback(new Error(msg), false);
//         }
//     }
// }));



app.use(helmet());
if(process.env.NODE_ENV === 'development') {
    const morgan = require('morgan')('dev');
    app.use(morgan);
}

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/api-doc/', express.static(path.join(__dirname, 'collections')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/user-avatars', express.static(path.join(__dirname, 'uploads/' + appConfigs.uploads.user_images)));
app.use('/customer-avatars', express.static(path.join(__dirname, 'uploads/' + appConfigs.uploads.customer_images)));
app.use('/games', express.static(path.join(__dirname, 'uploads/' + appConfigs.uploads.game_images)));
app.use('/project-images', express.static(path.join(__dirname, 'uploads/' + appConfigs.uploads.project_images)));



// Main Routes
app.get('/', require('./routes/main').main);

// Client API
app.use('/user-api/v1/auth', require('./routes/user-api/auth'));
app.use('/user-api/v1/user', require('./routes/user-api/user'));
app.use('/user-api/v1/game', require('./routes/user-api/game'));
app.use('/user-api/v1/menu', require('./routes/user-api/menu'));

// Customer API
app.use('/customer-api/v1/auth', require('./routes/customer-api/auth'));
app.use('/customer-api/v1/customer', require('./routes/customer-api/customer'));

// Handling errors for 404 not-founds
app.use((req, res) => {
    res.status(404).json({
        error: "URL-endpoint not found!"
    });
});




// Handling errors for any other cases from whole application
app.use((err, req, res) => {
    // TODO: log err.message
    res.status(500).json({
        error: "Something went wrong!"
    });
});




http.createServer(app);
app.listen(port, () => {
    console.log(`Server started on port ${port} !!!`);
});