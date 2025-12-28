
import React, { useState } from 'react';
import { AI_COURSE } from '../constants';
import { Lesson } from '../types';

export const LessonItem: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl mb-3 overflow-hidden bg-white shadow-sm transition hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm">
            {lesson.id}
          </span>
          <div>
            <h4 className="font-semibold text-gray-900 leading-tight">{lesson.title}</h4>
            <p className="text-xs text-indigo-600 font-medium">{lesson.hinglishTitle}</p>
          </div>
        </div>
        <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-500">{lesson.duration}</span>
      </button>
      
      {isOpen && (
        <div className="p-4 pt-0 border-t border-gray-50 bg-gray-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Tool Used</p>
              <p className="text-sm font-medium text-gray-700">{lesson.tool}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Main Skill</p>
              <p className="text-sm font-medium text-gray-700">{lesson.skill}</p>
            </div>
          </div>
          <div className="mt-4 bg-white p-3 rounded-lg border border-indigo-100">
            <p className="text-xs font-bold text-indigo-400 uppercase mb-1">Your Task (Practical)</p>
            <p className="text-sm text-gray-800 italic">"{lesson.task}"</p>
          </div>
          <div className="mt-4 bg-green-50 p-3 rounded-lg border border-green-100">
            <p className="text-xs font-bold text-green-600 uppercase mb-1">Expected Output</p>
            <p className="text-sm text-gray-800">{lesson.output}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const CourseSection: React.FC = () => {
  return (
    <section id="course" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Course 001</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4 text-gray-900">AI Tools for Daily Earning</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Zero background? No problem. Yeh course aapko AI expert nahi, balki AI user banayega jo earning start kar sake.
          </p>
        </div>

        <div className="bg-indigo-600 rounded-3xl p-8 mb-12 text-white flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">21 Days of Practice</h3>
            <p className="opacity-90 mb-6">Roz sirf 10-15 minute. 15 din learning, baki din portfolio building.</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Zero Cost Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Practical Tasks</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto">
             <button className="w-full md:w-auto bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-xl">
               Join Community to Start
             </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Lesson Breakdown</h3>
          {AI_COURSE.lessons.map(lesson => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </div>

        <div className="mt-16 p-8 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 text-center">
          <h3 className="text-2xl font-bold mb-4">Final Project: AI Skill Portfolio</h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Course khatam hone par aapke paas ek shareable Google Doc ya PDF hoga jisme aapka real work (Resume, Ad Copy, Images) hoga. 
            Isse aap kisi bhi client ya job me dikha sakte hain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium">Resume Draft</span>
            <span className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium">7-Day Content Plan</span>
            <span className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium">Excel Tool Kit</span>
            <span className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium">Business Posters</span>
          </div>
        </div>
      </div>
    </section>
  );
};
