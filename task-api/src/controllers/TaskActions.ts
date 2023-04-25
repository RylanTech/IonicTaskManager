import { RequestHandler } from "express";
import { Task } from "../models/Task";

export const getTasks: RequestHandler = async (req, res, next) => {
    let tasks: Task[] = await Task.findAll();
    res.json(tasks);
}
export const postTask: RequestHandler = async (req, res, next) => {
    let newTask = req.body
    if (newTask.title) {
        let created = await Task.create(newTask);
        res.status(201).json(created);
    } else {
        res.status(400).json();
    }
}
export const putTask: RequestHandler = async (req, res, next) => {
    let taskId = req.params.taskId;
    let editedTask: Task = req.body;
    let taskNum = parseInt(taskId);
    let matchingTask = await Task.findByPk(taskNum);
    console.log(editedTask)

    if (matchingTask) {
        await Task.update(editedTask, {where: {taskId: taskNum}});
        res.status(200).json();
    } else {
        res.status(400).json()
    }
}
export const deleteTask: RequestHandler = async (req, res, next) => {
    let taskId = req.params.taskId;
    let taskNum = parseInt(taskId);
    let matchingTask = await Task.findByPk(taskNum)

    if (matchingTask) {
        await Task.destroy({ where: { taskId: taskId }});
        res.status(200).json();
    } else {
        res.status(400).json()
    }

}