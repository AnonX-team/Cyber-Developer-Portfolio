
import React from 'react';
import { Shield, Code, Database, Briefcase, LucideIcon } from 'lucide-react';
import { SKILLS } from '../constants';

const iconMap: Record<string, LucideIcon> = {
  Shield: Shield,
  Code: Code,
  Database: Database,
  Briefcase: Briefcase,
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Competencies</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((skill, idx) => {
            const IconComp = iconMap[skill.icon] || Code;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
