import categories from "./CategorySeeder.js";
import prices from "./PriceSeeder.js";
import users from "./UserSeeder.js";
import db from "../../config/database.js";
import { Category, Price, User } from "../Models/Associations.js";

const execSeed = async () => {
    try {
        await db.authenticate();

        await db.sync();

        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users)
        ])

        console.log('Exec Seeds...');

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const deleteData = async () => {
    try {
        await db.sync({ force: true });

        console.log('Data deleted');

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if (process.argv[2] === '-i') {
    execSeed();
}

if (process.argv[2] === '-e') {
    deleteData();
}