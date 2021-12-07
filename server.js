
require('dotenv').config();

const port = process.env.APP_PORT;
const http = require('http');
const express = require('express');
const expHbs = require('express-handlebars');
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
app.use('/games', express.static(path.join(__dirname, 'uploads/' + appConfigs.uploads.game_images)));


// Express HandleBars
app.engine('handlebars', expHbs.engine({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');


// Main Routes
app.get('/', require('./routes/main').main);
app.get('/', require('./routes/main').about);
app.get('/users', require('./routes/main').users);

// Client API
app.use('/v1/auth', require('./routes/auth'));
app.use('/v1/user', require('./routes/user'));
app.use('/v1/game', require('./routes/game'));

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
