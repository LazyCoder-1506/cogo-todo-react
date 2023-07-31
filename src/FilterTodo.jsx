import React from 'react'

const FilterTodo = ({
  searchTodo,
  setSearchTodo,
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
  filterDueDate,
  setFilterDueDate
}) => {
  return (
    <div className='grid grid-cols-1 gap-4 content-start'>
      <div className='flex flex-col gap-2'>
        <label htmlFor="searchTodo" className="font-bold">Search</label>
        <input type="text" className='rounded p-2 border' name='searchTodo' id='searchTodo' value={searchTodo}  onChange={(e) => setSearchTodo(e.target.value)} placeholder='Search Todos by Name' />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="todoPriorityFilter" className="font-bold">Filter by Priority</label>
        <select className='rounded p-2 border' name="todoPriorityFilter" id="todoPriorityFilter" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="todoStatusFilter" className="font-bold">Filter by Status</label>
        <select className='rounded p-2 border' name="todoStatusFilter" id="todoStatusFilter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All</option>
          <option value="true">Done</option>
          <option value="false">Not Done</option>
        </select>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="todoDueDateFilter" className="font-bold">Filter by Due Date</label>
        <select className='rounded p-2 border' name="todoDueDateFilter" id="todoDueDateFilter" value={filterDueDate} onChange={(e) => setFilterDueDate(e.target.value)}>
          <option value="">All</option>
          <option value="active">Today or Later</option>
          <option value="previous">Earlier</option>
        </select>
      </div>
    </div>
  )
}

export default FilterTodo