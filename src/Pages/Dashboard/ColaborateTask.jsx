import React, { useState, useEffect } from 'react';
import { useUser } from '../../Provider/UserContext';

const TeamTask = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortCriteria, setSortCriteria] = useState('dueDate');
  const [filterPriority, setFilterPriority] = useState('all');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.title = 'Team Tasks - T-Task';
  }, []);

  useEffect(() => {
    const userTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const userTasksFiltered = userTasks.filter(task => {
      return (
        task.team && task.team.includes(user.email) // Collaborator tasks
      );
    }).map(task => ({ ...task, status: task.status || 'pending' }));
    setTasks(userTasksFiltered);

    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(allUsers);
  }, [user.email]);

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const handleInviteClick = (taskId) => {
    const invitedEmail = prompt("Enter email address to invite:");
    if (invitedEmail) {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.taskid === taskId) {
            task.team = task.team || [];
            if (!task.team.includes(invitedEmail)) { // Check if email is not already in team
              task.team.push(invitedEmail);
            }
          }
          return task;
        });
  
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
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
      const priorityOrder = { low: 3, medium: 2, high: 1 }; // Adjust as needed
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
  });

  return (
    <div className="container mx-auto p">
      <h3 className='text-center text-xl font-bold'>Team Tasks</h3>
      <div className="flex mb-4 justify-center bg-slate-400 p-3">
        {/* Status Filter */}
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

        {/* Priority Filter */}
        <label className="block mb-2 font-bold ml-4">Priority Filter:</label>
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

        {/* Sort By */}
        <label className="block mb-2 font-bold ml-4">Sort By:</label>
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedTasks.length > 0 ? (
        sortedTasks.map(task => (
          <div key={task.taskid} className="bg-green-300 p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">{task.title}</h3>
            <p className="text-gray-700 mb-2">{task.description}</p>
            <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Due Date:</span> {task.dueDate}</p>
            <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Status:</span> <span className='badge badge-secondary'>{task.status}</span></p>
            <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Priority:</span> {task.priority}</p>
            <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Task Created By:</span> {getUserName(task.userid)}</p>
            <p className="text-gray-700 mb-2"><span className="text-lg font-semibold">Team:</span> {task.team ? task.team.join(", ") : "No team members yet"}</p>
            <button onClick={() => handleInviteClick(task.taskid)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full mt-2">
              Invite
            </button>
          </div>
        ))):(
          <div className="text-center text-2xl font-bold text-gray-700">No tasks found</div>
        )}
      </div>
    </div>
  );
};

export default TeamTask;

