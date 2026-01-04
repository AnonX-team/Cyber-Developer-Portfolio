
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
          <p className="text-gray-400">A collection of academic and real-world projects focused on security and performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-mono rounded uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1">{project.description}</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <button className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors">
                    <Github className="w-4 h-4" /> Source
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
