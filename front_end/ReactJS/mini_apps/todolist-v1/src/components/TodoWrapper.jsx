import React, { useEffect, useState } from 'react'
import AddTodoForm from './AddTodoForm'
import { v4 } from 'uuid';
import ToDoItem from './ToDoItem';
import EditTodoForm from './EditTodoForm';


export default function TodoWrapper() {    
    const todosStoredValue = JSON.parse(localStorage.getItem('todos'))

    const [ todos, setTodos ] = useState(todosStoredValue ? [...todosStoredValue] : []);

    const addTodo = todo => {
        setTodos([...todos,
            {
                id: v4(),
                task: todo,
                complete: false,
                isEditing: false
            }
        ]);
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => (todo.id === id) ? {...todo, complete: !todo.complete} : todo))
    }

    const deleTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
    }

    const cancelEdit = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: false} : todo))
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

  return (
    <div className='todo__wrapper'>
        <h1 className='todo__title'>My To Do's!</h1>
        
        <AddTodoForm addTodo={addTodo}/>

        <div className='todo__container'>
            {
                todos.map((todo, i) => 
                    todo.isEditing
                        ? <EditTodoForm
                            key={todo.id}
                            task={todo}
                            editTodo={editTask}
                            cancelEdit={cancelEdit}/>
                        : <ToDoItem
                            key={i}
                            task={todo}
                            toggleComplete={toggleComplete}
                            deleTodo={deleTodo}
                            editTodo={editTodo}/>
                )
            }
        </div>
    </div>
  )
}