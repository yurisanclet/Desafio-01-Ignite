import styles from './TasksInfo.module.css';
import { ITask } from '../App';
import { Task } from './Task';
import { TbClipboardText} from 'react-icons/tb';


export interface TaskProps {
  tasks: ITask[];
  onDeleteTask: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}


export function TaskInfo({tasks, onDeleteTask, onComplete}: TaskProps){
  const countTasks = tasks.length
  const completedTasks = tasks.filter(task => task.isCompleted === true).length

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Tarefas criadas</p>
          <span>{countTasks}</span>
        </div>
        <div>
          <p>Concluídas</p>
          <span>{completedTasks} de {countTasks}</span>
        </div>

      </header>
      
      <div className={styles.list}>
        {tasks.map(task =>{
          return <Task
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onComplete={onComplete}
          />
        })}

        {tasks.length <= 0 && (
          <section className={styles.empty}>
            <TbClipboardText size={50}/>
            <div>
              <p>
                Você ainda não tem tarefas cadastradas
              </p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}