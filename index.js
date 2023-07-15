import express from "express";
import auth from './routes/auth.js';
import db from './config/database.js';
import dotenv from './config/dotenv.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

try {
    await db.authenticate();
    db.sync();
    console.log('conection ok');
} catch (error) {
    console.log(error)
}

app.set('view engine', 'pug')
app.set('views', './resources/views')
app.use(express.static('public'))

app.use('/', auth)


const port = process.env.NODE_PORT || 8080;

app.listen(port, () => {
    console.log(`El server esta corriendo desde el puerto: ${port}`)
});