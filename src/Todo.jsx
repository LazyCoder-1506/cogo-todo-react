import React from 'react'

const Todo = ({
  data,
  deleteTodo,
  markTodoDone,
  markTodoUndone,
  editTodo
}) => {
  
  return (
    <div className='border shadow-md p-4 bg-white rounded'>
      <p className={"font-bold mb-3" + (data.done ? " text-gray-400 line-through" : "")}>
        {data.name} 
        <span className={"ms-2 text-xs px-2 py-1 rounded-full border border-2 " + (data.priority === 'high' ? 'text-red-500 border-red-500 bg-red-500/10' : (data.priority === 'medium' ? 'text-amber-500 border-amber-500 bg-amber-500/10' : 'text-green-500 border-green-500 bg-green-500/10'))}>{data.priority}</span>
      </p>
      <div className="flex gap-3">
        {
          data.done ? 
          <button type='button' onClick={() => { markTodoUndone(data.id) }} className="text-sm bg-amber-600 text-white px-3 py-2 rounded">Mark Undone</button> :
          <button type='button' onClick={() => { markTodoDone(data.id) }} className="text-sm bg-green-600 text-white px-3 py-2 rounded">Mark Done</button>
        }
        <button type='button' onClick={() => { editTodo(data.id) }} className="text-sm bg-gray-600 text-white px-3 py-2 rounded">Edit</button>
        <button type='button' onClick={() => { deleteTodo(data.id) }} className="text-sm bg-red-600 text-white px-3 py-2 rounded">Delete</button>
        <span className="ml-auto order-last italic text-grey-600 text-sm self-end">{new Date(data.dueDate).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</span>
      </div>
    </div>
  )
}

export default Todo