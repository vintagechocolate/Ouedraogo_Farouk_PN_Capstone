import React from 'react';

function ProjectList({ projects, deleteProject, updateProject }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project._id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>Due Date: {project.dueDate ? project.dueDate.toLocaleDateString() : 'N/A'}</p>
          <button onClick={() => deleteProject(project._id)}>Delete</button>
          <button onClick={() => updateProject(project._id, { completed: !project.completed })}>
            {project.completed ? 'Undo' : 'Complete'}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
