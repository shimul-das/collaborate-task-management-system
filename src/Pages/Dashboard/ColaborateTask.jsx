import React, { useState, useEffect } from 'react';
import { useUser } from '../../Provider/UserContext';

const TeamTask = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const userTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const userTasksFiltered = userTasks.filter(task => {
      return (
        task.team && task.team.includes(user.email) // Collaborator tasks
      );
    }).map(task => ({ ...task, status: task.status || 'pending' }));
    console.log(userTasks)
    setTasks(userTasksFiltered);
  }, [user.email, refreshKey]);

  const handleInviteClick = (taskId) => {
    const invitedEmail = prompt("Enter email address to invite:");
    if (invitedEmail) {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.taskid === taskId) {
            task.team = task.team || [];
            task.team.push(invitedEmail);
          }
          return task;
        });

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      setRefreshKey(prevKey => prevKey + 1);
    }
  };  

  const handleStatusChange = (taskId, selectedStatus) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.taskid === taskId) {
          task.status = selectedStatus;
        }
        return task;
      });

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <div key={task.taskid} className="bg-green-300 p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">{task.title}</h3>
          <p className="text-gray-700 mb-2">{task.description}</p>
          <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Due Date:</span> {task.dueDate}</p>
          <p className="text-gray-700 mb-2"><span className='text-lg font-semibold'>Status:</span> <span className='badge badge-secondary'>{task.status}</span></p>
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
  );
};

export default TeamTask;

