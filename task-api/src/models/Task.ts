import { DataTypes, Model } from "sequelize";
import { InferAttributes, InferCreationAttributes } from "sequelize/types/model";
import Sequelize from "sequelize/types/sequelize";

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>>{
    declare taskId: number;
    declare title: string;
    declare completed: boolean;
}

export function TaskFactory(sequelize: Sequelize) {
    Task.init({
        taskId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'tasks',
        freezeTableName: true,
        sequelize
    });
}