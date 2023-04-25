import { IonButton, IonCheckbox, IonContent, IonFooter, IonHeader, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import TaskContext from '../contexts/TaskContext';
import { useDialog } from '../hooks/useDialog';
import './Home.css';

const Home: React.FC = () => {
  let { getTasks, createTask, deleteTask, editTask } = useContext(TaskContext);
  let { showPrompt } = useDialog();
  let [tasks, setTasks] = useState<Task[]>([]);

  type Task = {
    taskId: string;
    title: string;
    description: string;
    completed: boolean;
  };

  useEffect(() => {
    done()
    notDone()
    async function gettingTasks() {
      setTasks(await getTasks())
    }
    gettingTasks()
  }, [])

  function changeStatusToIC(id: string, title: string) {
    let taskId: number = parseInt(id)
    let task = {
      taskId,
      title,
      completed: false
    }
    editTask(task).then(window.location.reload())
  }

  function changeStatusToC(id: string, title: string) {
    let taskId: number = parseInt(id)
    let task = {
      taskId,
      title,
      completed: true
    }
    editTask(task).then(window.location.reload())
  }

  const done = () => {
    return tasks.map((task) => {
      if (task.completed) {
        return (
          <IonItemSliding>
            <IonItem key={task.taskId}>
              <IonCheckbox onClick={() => {
                changeStatusToIC(task.taskId, task.title)
              }} color="success" checked={true}>{task.title}</IonCheckbox>
            </IonItem>

            <IonItemOptions>
            <IonItemOption color="danger" onClick={() => {
              deleteTask(task.taskId).then(window.location.reload());
            }}>Delete</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        );
      } else {
        return
      }
    });
  }

  const notDone = () => {
    return tasks.map((task) => {
      if (!task.completed) {
        return (
          <IonItemSliding>
            <IonItem key={task.taskId}>
              <IonCheckbox onClick={() => {
                changeStatusToC(task.taskId, task.title);
              }} color="success">{task.title}</IonCheckbox>
            </IonItem>

            <IonItemOptions>
            <IonItemOption color="danger" onClick={() => {
              deleteTask(task.taskId).then(window.location.reload());
            }}>Delete</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        );
      } else {
        return
      }
    });
  }

  const prompt = async () => {
    showPrompt('Add Task', `What's the name of your task?`).then(taskTitle => {
      let task = {
        title: taskTitle,
        completed: false
      }
      createTask(task).then(window.location.reload())
      console.log(taskTitle)
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <h1>Incomplete</h1>
        </IonItem>
        {notDone()}
        <IonItem>
          <h1>Completed</h1>
        </IonItem>
        {done()}
      </IonContent>
      <IonFooter>
        <IonButton onClick={prompt} expand="block" color="success">Add Task</IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
