
import React from 'react';
import { Lesson } from '../types';

export const LessonPlayer: React.FC<{ lesson: Lesson; onClose: () => void }> = ({ lesson, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] glass flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white">
        {/* Main Content */}
        <div className="flex-1 bg-black relative">
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md"
          >
            ← Back
          </button>
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${lesson.youtubeId}?autoplay=1`}
            title={lesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Sidebar Info */}
        <div className="w-full md:w-[350px] bg-white p-6 flex flex-col border-l border-gray-100 overflow-y-auto">
          <span className="text-xs font-bold text-indigo-600 uppercase">Lesson {lesson.id}</span>
          <h2 className="text-xl font-extrabold text-gray-900 mt-1">{lesson.title}</h2>
          <p className="text-sm text-gray-500 mb-6">{lesson.hinglishTitle}</p>

          <div className="space-y-6">
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <h4 className="font-bold text-sm text-indigo-700 mb-2">Practical Task</h4>
              <p className="text-xs text-gray-700 leading-relaxed italic">"{lesson.task}"</p>
            </div>

            <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
              <h4 className="font-bold text-sm text-green-700 mb-2">Submit Output</h4>
              <p className="text-xs text-gray-600 mb-3">Is task ko karke screenshot community me post karein.</p>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-green-700">
                Submit on Telegram
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
              <h4 className="font-bold text-sm text-gray-800 mb-2">NotebookLM Key Insights</h4>
              <ul className="text-[10px] space-y-2 text-gray-500">
                <li className="flex items-center gap-2">✅ Main Logic: AI ko clear context dein.</li>
                <li className="flex items-center gap-2">✅ Pro-tip: Examples use karein.</li>
                <li className="flex items-center gap-2">✅ Warning: Basic theory skip na karein.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
