import React from 'react'

import { BiSolidEdit } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";

export default function ToDoItem({task, toggleComplete, deleTodo, editTodo}) {
  return (
    <div className='todo'>
        <button
            onClick={() => toggleComplete(task.id)}
            className={`todo__btn todo__btn__task ${task.complete ? 'complete' : ''}`}
            >{task.task}</button>
            
        <div className='todo__btn__actions'>
            <button
                className='todo__btn todo__btn__edit'
                onClick={() => editTodo(task.id)}
                ><BiSolidEdit/></button>
            <button
                className='todo__btn todo__btn__delete'
                onClick={() => deleTodo(task.id)}
                ><BiSolidTrash/></button>
        </div>
    </div>
  )
}