
import React from 'react';
import { Course } from '../types';

interface ResourceViewerProps {
  course: Course;
  onClose: () => void;
}

export const ResourceViewer: React.FC<ResourceViewerProps> = ({ course, onClose }) => {
  if (!course.externalLink) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-gray-900 flex flex-col">
      <div className="bg-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-indigo-600 font-bold flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <div>
            <h2 className="font-black text-gray-900 leading-none">{course.name}</h2>
            <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-widest">Embedded Resource Viewer</p>
          </div>
        </div>
        <div className="flex gap-3">
            <a 
              href={course.externalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition"
            >
              Open in New Tab ↗
            </a>
            <button 
              onClick={onClose}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition"
            >
              Close Viewer
            </button>
        </div>
      </div>
      
      <div className="flex-1 bg-white relative">
        <iframe 
          src={course.externalLink} 
          className="w-full h-full border-none"
          title={course.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        
        {/* Anti-CORS / Loading Hint */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-500 bg-white/5 backdrop-blur-[1px]">
           <p className="bg-gray-900/80 text-white px-4 py-2 rounded-full text-xs font-bold">
             Resource Loading... (If blank, use "Open in New Tab")
           </p>
        </div>
      </div>
    </div>
  );
};
