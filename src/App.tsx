import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { TaskInfo} from './components/TasksInfo'
import './global.css'

const LOCAL_STORAGE_KEY = "todo:savedTasks";

export interface ITask {
  id:string,
  title: string,
  isCompleted: boolean
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  
  function loadSavedTasks(){
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(saved){
      setTasks(JSON.parse(saved))
    }
  }


  function setTasksAndSave(newTasks: ITask[]){
    setTasks(newTasks)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }

  function addNewTask(taskTitle: string){
    const id = crypto.randomUUID();
    const task = {
        id,
        title: taskTitle,
        isCompleted: false
    }
    setTasksAndSave([
      ...tasks, 
      task
    ])
  }



  function toggleTaskCompleted(taskId: string){
    const newTasks = tasks.map(task => {
      if(task.id === taskId){
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    })
    setTasksAndSave(newTasks)
  }


  function deleteTask(taskId: string){
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskId;
    })
    setTasksAndSave(tasksWithoutDeletedOne)
  }

  useEffect(() => {
    loadSavedTasks()
  }, [])


  return (
    <>
      <Header
        onAddTask={addNewTask}
      />
      <TaskInfo
        tasks={tasks}
        onDeleteTask={deleteTask}
        onComplete={toggleTaskCompleted}
      />
    </>
  )
}

export default App
