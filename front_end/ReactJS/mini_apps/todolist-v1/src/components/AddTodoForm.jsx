import React, { useRef, useState } from 'react';

import { BiSolidAddToQueue } from "react-icons/bi";

export default function AddTodoForm({addTodo}) {
    const [ value, setValue] = useState('');
    const inputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();        
        if(value.length <= 0){
          alert("There is nothing to add on your to do! Please try again.")
        }else{
          addTodo(value);
          setValue('');
          inputRef.current.focus();
        };
    }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='todo__form'>
        <input
            type="text"
            placeholder="Type your to do's here"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            className='todo__input'
            />
        <button className='todo__btn__add'><BiSolidAddToQueue/></button>
    </form>
  )
}