import React from 'react'

const AddTodo = ({ 
  todoName,
  setTodoName,
  todoDueDate,
  setTodoDueDate,
  todoPriority,
  setTodoPriority,
  saveTodo 
}) => {
  return (
    <div className='grid grid-cols-1 gap-4 content-start'>
      <div className='flex flex-col gap-2'>
        <label htmlFor="todoName" className="font-bold">Name</label>
        <input type="text" className='rounded p-2 border' name='todoName' id='todoName' value={todoName}  onChange={(e) => setTodoName(e.target.value)} placeholder='Todo Name' />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="todoDueDate" className="font-bold">Due Date</label>
        <input type="date" className='rounded p-2 border' name='todoDueDate' id='todoDueDate' value={todoDueDate}  onChange={(e) => setTodoDueDate(e.target.value)} />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="todoPriority" className="font-bold">Priority</label>
        <select className='rounded p-2 border' name="todoPriority" id="todoPriority" value={todoPriority} onChange={(e) => setTodoPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type='button' onClick={saveTodo} className="bg-green-600 text-white px-3 py-2 rounded justify-self-start">Save Todo</button>
    </div>
  )
}

export default AddTodo