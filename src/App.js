import { Link, Route, Routes } from 'react-router-dom';

import ActivityLog from "./ActivityLog";
import TodoList from "./TodoList";

function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className='w-full bg-white shadow-lg mb-4 px-8 py-4 flex gap-8'>
        <Link to="/">Todos</Link>
        <Link to="/activity">Activity Log</Link>
      </div>
      <Routes>
        <Route path='/' element={<TodoList />} />
        <Route path='/activity' element={<ActivityLog />} />
      </Routes>
    </div>
  );
}

export default App;
