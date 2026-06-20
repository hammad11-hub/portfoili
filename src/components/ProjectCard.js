import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <article className="card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tech-list">
        {project.techStack?.map((tech) => (
          <span key={tech} className="tech-pill">
            {tech}
          </span>
        ))}
      </div>
      <div className="links">
        {project.link && (
          <a className="link-button" href={project.link} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        )}
        {project.github && (
          <a className="link-button" href={project.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
