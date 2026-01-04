
import React, { useEffect, useState } from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import { BIO } from '../constants';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Initializing secure connection... SUCCESS.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/0 via-gray-950/50 to-gray-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
            <Shield className="w-3 h-3" />
            <span>{BIO.cehStatus}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Building <span className="gradient-text">Secure</span> Digital <br /> 
            Experiences.
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            {BIO.summary}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/20"
            >
              Get in Touch
              <ChevronRight className="ml-2 w-4 h-4" />
            </a>
            <a 
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold border border-gray-700 transition-all"
            >
              View Projects
            </a>
          </div>

          <div className="mt-12 p-4 rounded-lg bg-black/40 border border-gray-800 font-mono text-sm text-blue-400/80">
            <p>$ {text}<span className="animate-pulse">_</span></p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none hidden lg:block">
        <div className="scanner-line" />
        <div className="h-full w-full border-l border-blue-500/30 rotate-12 transform translate-x-1/2" />
      </div>
    </section>
  );
};

export default Hero;
