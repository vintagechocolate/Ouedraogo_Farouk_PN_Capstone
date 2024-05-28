import React from 'react';

function TaskList({ tasks, deleteTask, updateTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate ? task.dueDate.toLocaleDateString() : 'N/A'}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
          <button onClick={() => updateTask(task._id, { completed: !task.completed })}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
