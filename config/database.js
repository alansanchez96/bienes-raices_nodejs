import { Sequelize } from "sequelize";
import dotenv from './dotenv.js';

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

try {
    await db.authenticate();
    db.sync();
    console.log('conection ok');
} catch (error) {
    console.log(error)
}

export default db;