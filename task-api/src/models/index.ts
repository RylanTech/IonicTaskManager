import { Sequelize } from "sequelize";
import { TaskFactory } from "./Task"; 

const dbName = 'tasks';
const username = 'root';
const password = '0624';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

//importing the table contructor
TaskFactory(sequelize);

export const db = sequelize;