import React, { useState } from 'react'
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

export default function EditTodoForm({task, editTodo, cancelEdit}) {
  const [ value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
      e.preventDefault();

      if(value.length <= 0) return;
      editTodo(value, task.id);
      setValue('');
  }

return (
	<form onSubmit={(e) => handleSubmit(e)} className='todo__form todo__form__edit'>
		<input
			type="text"
			placeholder="Update this task"
			value={value}
			onChange={(e) => setValue(e.currentTarget.value)}
			className='todo__input todo__input__edit'/>

		<div className='todo__btn__actions'>
			<button type="submit" className='todo__btn todo__btn__confirm'><IoCheckmarkSharp/></button>
			<button type="button" className='todo__btn todo__btn__cancel' onClick={() => cancelEdit(task.id)}><IoCloseSharp/></button>
		</div>
	</form>
)
}