import React, { useState, useEffect } from 'react';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortCriteria, setSortCriteria] = useState('dueDate');
  const [filterPriority, setFilterPriority] = useState('all');
  useEffect(() => {
    document.title = 'All Tasks - T-Task';
  }, []); 

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

  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortCriteria === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortCriteria === 'priority') {
      const priorityOrder = { low: 3, medium: 2, high: 1 }; 
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
  });

  return (
<div className="container mx-auto  p">
  <h3 className='text-center text-xl font-bold'>All Tasks Added By All User</h3>
      <div className="flex mb-4 justify-center bg-slate-400 p-3">
        <div className="mr-4">
          <label className="block mb-2 font-bold">Status Filter:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="inProgress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="mr-4">
          <label className="block mb-2 font-bold">Priority Filter:</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-bold">Sort By:</label>
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTasks.map(task => (
          <div key={task.taskid} className="bg-green-300 p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">{task.title}</h3>
            <p className="text-gray-700 mb-2">{task.description}</p>
            <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Due Date:</span> {task.dueDate}</p>
            <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Status:</span> <span className='badge badge-secondary'>{task.status}</span></p>
            <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Priority:</span> {task.priority}</p>
            <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Task Created By:</span> {getUserName(task.userid)}</p>
            <p className="text-gray-700 mb-2"><span className="text-lg font-semibold">Team:</span> {task.team ? task.team.join(", ") : "No team members yet"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
