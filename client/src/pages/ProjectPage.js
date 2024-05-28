import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import { useAuth } from '../utils/authUtils';

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addProject = async (project) => {
    try {
      const response = await axios.post('/api/projects', project, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects([...projects, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(projects.filter((project) => project._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateProject = async (id, updatedProject) => {
    try {
      const response = await axios.put(`/api/projects/${id}`, updatedProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(projects.map((project) => (project._id === id ? response.data : project)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <ProjectForm addProject={addProject} />
      <ProjectList
        projects={projects}
        deleteProject={deleteProject}
        updateProject={updateProject}
      />
    </div>
  );
}

export default ProjectPage;
