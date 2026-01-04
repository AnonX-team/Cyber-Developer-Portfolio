
import React from 'react';
import { GraduationCap, MapPin } from 'lucide-react';
import { EXPERIENCES, BIO } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-gray-950 cyber-grid bg-fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Work Experience */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="p-2 bg-blue-500/20 rounded-lg"><MapPin className="text-blue-500" /></span>
              Professional Journey
            </h2>
            <div className="space-y-8">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="relative pl-8 border-l border-gray-800 group">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <div className="mb-2">
                    <span className="text-sm font-mono text-blue-400">{exp.period}</span>
                    <h3 className="text-xl font-bold text-gray-100">{exp.role}</h3>
                    <p className="text-blue-500 font-medium">{exp.company}</p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-400 text-sm leading-relaxed">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="p-2 bg-emerald-500/20 rounded-lg"><GraduationCap className="text-emerald-500" /></span>
              Education
            </h2>
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <GraduationCap className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{BIO.education.degree}</h3>
              <p className="text-emerald-500 mb-6 font-medium">{BIO.education.university}</p>
              
              <div className="space-y-4">
                <p className="text-gray-300 font-semibold text-sm uppercase tracking-wider">Major Focus Areas:</p>
                <div className="flex flex-wrap gap-2">
                  {BIO.education.areas.map((area, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
