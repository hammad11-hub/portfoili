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
  return <Home projects={fallbackProjects} />;
}

export default App;
