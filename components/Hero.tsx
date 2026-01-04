
import React, { useEffect, useState } from 'react';
import { Shield, ChevronRight, Cpu, Lock } from 'lucide-react';
import { BIO } from '../constants';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Initializing secure connection... Adil_OS v2.4 Loaded. Encryption: AES-256-GCM.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-gray-950/60 to-gray-950 pointer-events-none" />
      
      {/* Background Animated Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none delay-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono mb-8 uppercase tracking-[0.2em] backdrop-blur-md">
            <Shield className="w-3 h-3 animate-pulse" />
            <span>{BIO.cehStatus} Authenticated</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none">
            Architecting <br />
            <span className="gradient-text drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Secure Systems</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl font-light">
            {BIO.summary}
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a 
              href="#contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white font-bold transition-all overflow-hidden"
            >
              <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[45deg] -translate-x-[150%] group-hover:translate-x-[400%] transition-transform duration-700" />
              Secure a Consultation
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 font-bold border border-gray-800 hover:border-blue-500/50 transition-all backdrop-blur-xl"
            >
              System Portfolio
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            <div className="p-4 rounded-xl bg-black/40 border border-gray-800 flex items-center gap-4 group hover:border-blue-500/30 transition-colors">
              <Cpu className="w-8 h-8 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
              <div>
                <p className="text-[10px] font-mono text-gray-500 uppercase">Latency</p>
                <p className="text-sm font-bold text-gray-300">Fast Performance</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-gray-800 flex items-center gap-4 group hover:border-emerald-500/30 transition-colors">
              <Lock className="w-8 h-8 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
              <div>
                <p className="text-[10px] font-mono text-gray-500 uppercase">Protocol</p>
                <p className="text-sm font-bold text-gray-300">Secure by Design</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-gray-800 flex items-center gap-4 group hover:border-purple-500/30 transition-colors">
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-purple-500/30 group-hover:border-purple-500 animate-[spin_5s_linear_infinite]" />
              <div>
                <p className="text-[10px] font-mono text-gray-500 uppercase">AI Engine</p>
                <p className="text-sm font-bold text-gray-300">Gemini Grounded</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-5 rounded-xl bg-black/60 border border-blue-500/10 font-mono text-xs text-blue-400/70 backdrop-blur-md shadow-2xl">
            <div className="flex gap-2 mb-2 border-b border-gray-800 pb-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <p>$ {text}<span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" /></p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none hidden lg:block">
        <div className="scanner-line h-[4px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
        <div className="h-full w-full border-l border-blue-500/30 rotate-6 transform translate-x-1/2" />
      </div>
    </section>
  );
};

export default Hero;
