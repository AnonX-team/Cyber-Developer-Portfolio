
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import { BIO } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-blue-500/30">
      <Navbar />
      
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="py-12 border-t border-gray-800 bg-gray-950 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm mono">
            &copy; {new Date().getFullYear()} {BIO.name}. Built with React, Tailwind & Gemini AI.
          </p>
          <p className="mt-2 text-xs text-blue-500/60 mono">
            SECURE_HANDSHAKE_ESTABLISHED: VERSION 1.0.5
          </p>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
