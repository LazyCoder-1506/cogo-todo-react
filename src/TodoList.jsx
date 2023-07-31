import React, { useEffect, useState } from 'react'
import Todo from './Todo';
import AddTodo from './AddTodo';
import FilterTodo from './FilterTodo';
import { dummyData } from './dummyDate';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const localStorageTodos = JSON.parse(localStorage.getItem('cogoReactTodos'));
    if (localStorageTodos.todos && localStorageTodos.todos.length > 0) return (localStorageTodos.todos);
    else return dummyData;
  });
  const [todoName, setTodoName] = useState("");
  const [todoDueDate, setTodoDueDate] = useState("");
  const [todoPriority, setTodoPriority] = useState("low");
  const [editTodoId, setEditTodoId] = useState("");
  const [searchTodo, setSearchTodo] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");

  useEffect(() => {
    saveTodosInLocalStorage();
  }, [todos])

  const saveTodosInLocalStorage = () => {
    localStorage.setItem('cogoReactTodos', JSON.stringify({ todos: todos }))
  }

  const saveTodo = () => {
    if (editTodoId.length === 0) {
      const newId = Date.now().toString();
      const newTodo = { id: newId, name: todoName, done: false, priority: todoPriority, dueDate: todoDueDate };
      setTodos([newTodo, ...todos]);
      updateActivity('add', todoName);
    } else {
      let editedTodos = [...todos];
      let editedTodoIndex = editedTodos.findIndex(todo => todo.id === editTodoId);
      let newEditedTodo = editedTodos[editedTodoIndex];
      newEditedTodo.name = todoName;
      newEditedTodo.priority = todoPriority;
      newEditedTodo.dueDate = todoDueDate;
      editedTodos[editedTodoIndex] = newEditedTodo;
      setTodos(editedTodos);
      updateActivity('edit', todoName);
    }
    setTodoName("");
    setTodoPriority("low");
    setTodoDueDate("");
    setEditTodoId("");
  }

  const editTodo = (todoId) => {
    let editingTodo = todos.find(todo => todo.id === todoId);
    setEditTodoId(todoId);
    setTodoName(editingTodo.name);
    setTodoPriority(editingTodo.priority);
    setTodoDueDate(editingTodo.dueDate);
  }

  const deleteTodo = (todoId) => {
    updateActivity('delete', todos.find(todo => todo.id === todoId).name);
    setTodos(todos.filter(todo => todo.id !== todoId));
  }

  const markTodoDone = (todoId) => {
    let newTodos = [...todos];
    let markedTodoIndex = newTodos.findIndex(todo => todo.id === todoId);
    let newMarkedTodo = newTodos[markedTodoIndex];
    newMarkedTodo.done = true;
    newTodos[markedTodoIndex] = newMarkedTodo;
    setTodos(newTodos);
    updateActivity('done', newMarkedTodo.name);
  }

  const markTodoUndone = (todoId) => {
    let newTodos = [...todos];
    let markedTodoIndex = newTodos.findIndex(todo => todo.id === todoId);
    let newMarkedTodo = newTodos[markedTodoIndex];
    newMarkedTodo.done = false;
    newTodos[markedTodoIndex] = newMarkedTodo;
    setTodos(newTodos);
    updateActivity('undone', newMarkedTodo.name);
  }

  const checkDueDate = (todo) => {
    if (filterDueDate === "active") return (new Date().getTime() - 86400000 <= new Date(todo.dueDate).getTime());
    else return (new Date().getTime() - 86400000 > new Date(todo.dueDate).getTime());
  }

  const updateActivity = (activityType, todoName) => {
    const currentDateTime = new Date();
    const currentDateTimeString = currentDateTime.getDate() + "/"
    + (currentDateTime.getMonth()+1)  + "/" 
    + currentDateTime.getFullYear() + " @ "  
    + currentDateTime.getHours() + ":"  
    + currentDateTime.getMinutes() + ":" 
    + currentDateTime.getSeconds();

    const activityObj = { time: currentDateTimeString, activityType: activityType, todo: todoName };
    const localStorageLog = JSON.parse(localStorage.getItem('cogoReactLog'));
    if (localStorageLog && localStorageLog.activity.length > 0) {
      const activityLog = [...localStorageLog.activity, activityObj];
      localStorage.setItem('cogoReactLog', JSON.stringify({ activity: activityLog }))
    } else {
      localStorage.setItem('cogoReactLog', JSON.stringify({ activity: [activityObj] }))
    }
  }

  return (
    <div className='grid grid-cols-2 px-[10vw] py-8 gap-8'>
      <div className='grid grid-cols-1 gap-4 content-start'>
        <AddTodo
          todoName={todoName}
          setTodoName={setTodoName}
          todoDueDate={todoDueDate}
          setTodoDueDate={setTodoDueDate}
          todoPriority={todoPriority}
          setTodoPriority={setTodoPriority}
          saveTodo={saveTodo}
        />
        <FilterTodo
          searchTodo={searchTodo}
          setSearchTodo={setSearchTodo}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterDueDate={filterDueDate}
          setFilterDueDate={setFilterDueDate}
        />
      </div>
      <div className='grid grid-cols-1 gap-4 content-start'>
        {todos.map((todo) => (
          (filterPriority === "" || filterPriority === todo.priority) && 
          (searchTodo === "" || todo.name.toLowerCase().includes(searchTodo.toLowerCase())) &&
          (filterStatus === "" || filterStatus === todo.done.toString()) &&
          (filterDueDate === "" || checkDueDate(todo)) ?
          <Todo
            key={todo.id}
            data={todo}
            deleteTodo={deleteTodo}
            markTodoDone={markTodoDone}
            markTodoUndone={markTodoUndone}
            editTodo={editTodo}
          /> : <></>
        ))}
      </div>
    </div>
  )
}

export default TodoList