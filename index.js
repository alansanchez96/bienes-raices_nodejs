import express from "express";
import auth from './routes/auth.js';

const app = express();

app.set('view engine', 'pug')
app.set('views', './resources/views')
app.use(express.static('public'))

app.use('/', auth)


const port = 3000;

app.listen(port, () => {
    console.log(`El server esta corriendo desde el puerto: ${port}`)
});