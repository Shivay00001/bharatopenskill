
import React from 'react';
import { VOLUNTEER_ROLES, SCALE_ROADMAP } from '../constants';

export const VolunteerSection: React.FC = () => {
  return (
    <section id="volunteer" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">Join the Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SkillBharat Open hum sabka mission hai. Aap kisi bhi tarah se contribute kar sakte hain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {VOLUNTEER_ROLES.map((role, idx) => (
            <div key={idx} className="p-6 border border-gray-100 rounded-2xl bg-gray-50 hover:border-indigo-200 transition">
              <h4 className="text-lg font-bold text-gray-900 mb-2">{role.title}</h4>
              <p className="text-sm text-gray-600 mb-4 h-12">{role.description}</p>
              <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                How: {role.howToJoin}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-10">Our Roadmap (No Budget, All Impact)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SCALE_ROADMAP.map((item, idx) => (
                <div key={idx} className="relative pl-8 border-l border-gray-700">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                  <h5 className="text-indigo-400 font-bold mb-1 text-sm">{item.stage}</h5>
                  <h6 className="font-bold mb-2">{item.goal}</h6>
                  <p className="text-gray-400 text-sm">{item.method}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>
    </section>
  );
};
