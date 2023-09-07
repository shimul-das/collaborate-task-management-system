import React, { useState, useEffect } from 'react';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    setTasks(allTasks.map(task => ({ ...task, status: task.status || 'pending' })));
    setUsers(allUsers);
  }, []);

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <div key={task.taskid} className="bg-green-300 p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">{task.title}</h3>
          <p className="text-gray-700 mb-2">{task.description}</p>
          <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Due Date:</span> {task.dueDate}</p>
          <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Status:</span> <span className='badge badge-secondary'>{task.status}</span></p>
          <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Task Created By:</span> {getUserName(task.userid)}</p>
        </div>
      ))}
    </div>
  );
};

export default AllTask;

