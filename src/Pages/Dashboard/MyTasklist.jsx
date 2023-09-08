import React, { useState, useEffect } from 'react';
import { useUser } from '../../Provider/UserContext';

const MyTasklist = () => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortCriteria, setSortCriteria] = useState('dueDate'); // Add sort state
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    document.title = 'My Tasks - T-Task';
  }, []);
  useEffect(() => {
    const userTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userTasksFiltered = userTasks.filter(task => task.userid === user.id)
      .map(task => ({ ...task, status: task.status || 'pending' }));
    setTasks(userTasksFiltered);
    setUsers(allUsers);
  }, [user.id, refreshKey]);

  const handleInviteClick = (taskId) => {
    const invitedEmail = prompt("Enter email address to invite:");
    if (invitedEmail) {
      // Retrieve tasks from local storage
      const userTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
      // Make sure the user is the owner of the task
      const isOwner = userTasks.find(task => task.taskid === taskId && task.userid === user.id);
  
      if (isOwner) {
        const updatedTasks = userTasks.map(task => {
          if (task.taskid === taskId) {
            task.team = task.team || [];
            if (!task.team.includes(invitedEmail)) {
              task.team.push(invitedEmail);
            }
          }
          return task;
        });
  
        // Update local storage with the updated tasks
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  
        // Update the state with the updated tasks
        setTasks(updatedTasks);
        setRefreshKey(prevKey => prevKey + 1);
      }
    }
  };
  
  

  const handleStatusChange = (taskId, selectedStatus) => {
    // Retrieve tasks from local storage
    const userTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Check if the current user is the owner of the task
    const isOwner = userTasks.find(task => task.taskid === taskId && task.userid === user.id);
  
    if (isOwner) {
      const updatedTasks = userTasks.map(task => {
        if (task.taskid === taskId) {
          return { ...task, status: selectedStatus };
        }
        return task;
      });
  
      // Update local storage with the updated tasks
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  
      // Update the state with the updated tasks
      setTasks(updatedTasks);
      setRefreshKey(prevKey => prevKey + 1);
    }
  };

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
    <div>
      <h2 className='text-center text-2xl font-bold p-5 text-green-900'>All Tasks Added By Me</h2>
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
            <label className="flex items-center mb-2">
              <span className='text-lg font-semibold'>Change Status:</span> 
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.taskid, e.target.value)}
                className="ml-2"
              >
                <option value="completed">Completed</option>
                <option value="inProgress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
            </label>
            <button onClick={() => handleInviteClick(task.taskid)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full mt-2">
              Invite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasklist;


