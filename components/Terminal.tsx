
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { BIO, SKILLS, PROJECTS } from '../constants';

const Terminal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [history, setHistory] = useState<string[]>(['Welcome to Adil-OS v2.4.0', 'Type "help" to see available commands.']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim();
    let response = [`> ${cmd}`];

    switch (cleanCmd) {
      case 'help':
        response.push('Available commands: bio, skills, projects, clear, whoami, exit');
        break;
      case 'bio':
        response.push(BIO.summary);
        break;
      case 'skills':
        response.push('Loading skill modules...');
        SKILLS.forEach(s => response.push(`- ${s.category}: ${s.items.join(', ')}`));
        break;
      case 'projects':
        PROJECTS.forEach(p => response.push(`[${p.title}]: ${p.description}`));
        break;
      case 'whoami':
        response.push(`User: Guest | Subject: ${BIO.name} | Status: ${BIO.cehStatus}`);
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      default:
        response.push(`Command not found: ${cmd}. Type "help" for assistance.`);
    }
    setHistory(prev => [...prev, ...response]);
  };

  return (
    <div className="fixed inset-x-4 bottom-24 md:inset-x-auto md:right-6 md:bottom-24 z-50 w-full max-w-lg">
      <div className="bg-black/90 border border-blue-500/30 rounded-lg overflow-hidden shadow-2xl shadow-blue-500/10 backdrop-blur-xl">
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-mono text-gray-400">adil_khan@portfolio: ~</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="h-64 overflow-y-auto p-4 font-mono text-sm space-y-1 text-emerald-500 custom-scrollbar">
          {history.map((line, i) => (
            <div key={i} className={line.startsWith('>') ? 'text-blue-400' : ''}>{line}</div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="p-2 bg-gray-950 flex items-center gap-2">
          <span className="text-blue-500 ml-2">$</span>
          <input
            autoFocus
            className="bg-transparent border-none outline-none text-blue-400 w-full font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                executeCommand(input);
                setInput('');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
