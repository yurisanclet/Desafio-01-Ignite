import { PlusCircle } from "phosphor-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import rocketLogo from "../assets/Logo.svg";
import styles from './Header.module.css';

interface Props {
  onAddTask: (taskTitle: string) => void;
}


export function Header({ onAddTask }: Props){
  const [taskTitle, setTaskTitle] = useState("")

  function handleNewTask(event: FormEvent){
     event.preventDefault()
     onAddTask(taskTitle)
  }

  function onChangeInput(event: ChangeEvent<HTMLInputElement>){
    setTaskTitle(event.target.value)
  }

  return (
    <header className={styles.header}>
        <img src={rocketLogo}/>

        <form className={styles.taskForm} onSubmit={handleNewTask}>
          <input
            placeholder="Adicionar uma nova tarefa"  
            onChange={onChangeInput}
          ></input>
          <button>Criar <PlusCircle size={20}/></button>
        </form>
    </header>
  )
}