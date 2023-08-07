import { DataTypes } from "sequelize";
import db from '../../config/database.js';

const Property = db.define('properties', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parking: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wc: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

});

export default Property;