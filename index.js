import express from "express";
import users from './routes/users.js';

const app = express();

app.use('/', users)

const port = 3000;

app.listen(port, () => {
    console.log(`El server esta corriendo desde el puerto: ${port}`)
});