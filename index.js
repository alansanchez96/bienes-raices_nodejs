import express from 'express';
import auth from './routes/auth.js';
import properties from './routes/properties.js';
import db from './config/database.js';
import dotenv from './config/dotenv.js';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

const app = express();

// Habilita lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

// Habilitacion de CookieParser y CSRF
app.use(cookieParser())
app.use(csrf({ cookie: true }))

// Habilitacion de las Vistas con PUG
app.set('view engine', 'pug')
app.set('views', './resources/views')
app.use(express.static('public'))

// Global Routing
app.use('/', auth, properties)

const port = process.env.APP_PORT || 8080;

app.listen(port, () => {
    console.log(`El server esta corriendo desde el puerto: ${port}`)
});