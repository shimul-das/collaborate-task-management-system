import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../../Provider/UserContext';


const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const { user, handleLogout } = useUser();
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const newTask = {
      taskid:uuidv4(),
      userid:user.id,
      useremail:user.email,
      title,
      description,
      dueDate,
      priority,
      status:"pending",
      assignedTo
    };
    
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = [...existingTasks, newTask];
    
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setAssignedTo('');
    Swal.fire({
        icon: 'success',
        title: 'Task Created Successfully!',
        text: 'You have successfully created a new task.',
        confirmButtonText: 'OK',
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 border border-gray-300 p-4 rounded-lg bg-white">
        <h2 className="text-2xl mb-4 text-center font-bold">Create Task</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-600">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-600">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-gray-600">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-gray-600">Priority:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          {/* <div>
            <label htmlFor="assignedTo" className="block text-gray-600">Assigned To:</label>
            <input
              type="text"
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div> */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

