import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import TaskContext from "./TaskContext";

interface Task {
  taskId: number;
  taskName: string;
}

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = (props: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const baseUrl: string = 'http://localhost:3001/';

  useEffect(() => {
    async function gettingTasks() {
      let array = await getTasks()
      setTasks(array);
    }
    gettingTasks()
  }, [])

  function getTasks(): Promise<Task[]> {
    return axios.get(baseUrl + `tasks/`)
      .then((response: AxiosResponse<Task[]>) => response.data)
      .catch((error) => {
        throw new Error(error.response.statusText);
      })
  }

  function createTask(task: Task): Promise<Task> {
    return axios.post(baseUrl + "tasks", task)
      .then((response: AxiosResponse<Task>) => response.data)
      .catch((error) => {
        throw new Error(error.response.statusText);
      })
  }

  function editTask(task: Task): Promise<Task> {
    return axios.put(baseUrl + `tasks/${task.taskId}`, task)
      .then((response: AxiosResponse<Task>) => response.data)
      .catch((error) => {
        throw new Error(error.response.statusText);
      })
  }

  function deleteTask(id: number): Promise<void> {
    return axios.delete(baseUrl + `tasks/${id}`)
      .then(response => {
        // handle success
      })
      .catch(error => {
        // handle error
      });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        editTask,
        createTask,
        deleteTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}