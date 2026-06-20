import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import './App.css';

const fallbackProjects = [
  {
    title: 'Portfolio Website',
    description:
      'A polished, responsive personal portfolio with project listings, contact links, and modern UI styling.',
    techStack: ['React', 'CSS', 'Responsive Design'],
    github: 'https://github.com/hammad11-hub/job',
  },
];

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl) {
      setProjects(fallbackProjects);
      return;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
      })
      .catch((error) => {
        console.error('Failed to load projects:', error);
        setProjects(fallbackProjects);
      });
  }, []);

  return <Home projects={projects} />;
}

export default App;
