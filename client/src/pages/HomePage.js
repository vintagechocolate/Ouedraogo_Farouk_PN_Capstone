import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useAuth } from '../utils/authUtils';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('/api/tasks', task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </div>
  );
}

export default HomePage;
