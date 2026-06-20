import React from 'react';
import ProjectCard from '../components/ProjectCard';

const Home = ({ projects }) => {
  return (
    <main className="app-shell">
      <section className="section hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-card">
              <div className="hero-headline">
                <p className="hero-label">MERN Engineer • Full-stack • Deployment-ready</p>
                <h1>Hi, I'm Hammad Iqbal — building data-driven web experiences.</h1>
              </div>
              <p className="hero-copy">
                I create polished full-stack applications using MongoDB, Express, React, and Node.js. My work focuses on real-world product features, clean engineering, and fast deployment workflows.
              </p>
              <div className="hero-actions">
                <a href="https://www.linkedin.com/in/hammad-iqbal-malik001/" target="_blank" rel="noreferrer" className="hero-button">
                  View LinkedIn
                </a>
                <a href="mailto:hammad125100@gmail.com" className="hero-button hero-button-secondary">
                  Email Me
                </a>
                <a href="/resume.pdf" download className="hero-button hero-button-secondary">
                  Download Resume
                </a>
              </div>
              <div className="hero-grid">
                <div>
                  <strong>Focus</strong>
                  <p>Product-led SaaS apps, recruitment platforms, and API-first systems.</p>
                </div>
                <div>
                  <strong>Stack</strong>
                  <p>MERN, TypeScript-ready architecture, and cloud deployment.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="profile-circle-wrapper">
              <div className="profile-image">
                <img
                  src="/profile.jpg"
                  onError={(event) => { event.currentTarget.src = '/profile.svg'; }}
                  alt="Hammad Iqbal"
                  className="profile-img"
                />
              </div>
              <div className="image-badge">Available for Freelance</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-section">
        <h2>About Me</h2>
        <p>
          I am a growth-minded software engineer who turns ambitious ideas into reliable applications. I focus on engineering systems that scale, user experiences that feel delightful, and backend APIs that stay robust under load.
        </p>
        <ul className="about-list">
          <li>Develop full-stack SaaS products with React, Node, Express and MongoDB.</li>
          <li>Build APIs, data workflows, deployment pipelines and monitoring-ready apps.</li>
          <li>Ship collaborative, UX-driven solutions for teams and recruiters.</li>
        </ul>
      </section>

      <section className="section skills-section">
        <h2>Core Skills</h2>
        <div className="skills-grid">
          {['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'REST APIs', 'Postman', 'UI Design'].map((skill) => (
            <span key={skill} className="skill-pill">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="section projects-section">
        <h2>Featured Project</h2>
        <div className="cards">
          {projects.length
            ? projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))
            : (
                <ProjectCard
                  project={{
                    title: 'Loading…',
                    description: 'Loading content',
                    techStack: [],
                    github: '#'
                  }}
                />
              )}
        </div>
      </section>

      <section className="section contact-section">
        <h2>Connect With Me</h2>
        <p className="contact-copy">
          Want to collaborate on the next modern SaaS product? Reach out and let’s build something great.
        </p>
        <div className="contact-list">
          <div className="contact-card">
            <span>Email</span>
            <p>hammad125100@gmail.com</p>
          </div>
          <div className="contact-card">
            <span>Phone</span>
            <p>0328 033 9011</p>
          </div>
          <div className="contact-card">
            <span>LinkedIn</span>
            <a href="https://www.linkedin.com/in/hammad-iqbal-malik001/" target="_blank" rel="noreferrer">
              hammad-iqbal-malik001
            </a>
          </div>
          <div className="contact-card">
            <span>Resume</span>
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
