
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Lesson, Course } from '../types';

interface AdminPanelProps {
  courses: Course[];
  onUpdateCourses: (courses: Course[]) => void;
  onLogout: () => void;
  onBackToSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ courses, onUpdateCourses, onLogout, onBackToSite }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('');
  
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: '',
    description: '',
    externalLink: '',
    isEmbedded: true, // Default to true for embedded view
    duration: '21 Days',
    goal: ''
  });

  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
    title: '',
    hinglishTitle: '',
    skill: '',
    tool: '',
    task: '',
    output: '',
    duration: '10 mins',
    youtubeId: ''
  });

  const handleAddCourse = () => {
    if (!newCourse.name) {
      alert("Course name is required.");
      return;
    }
    const courseToAdd: Course = {
      id: `course-${Date.now()}`,
      name: newCourse.name!,
      description: newCourse.description || '',
      duration: newCourse.duration || '21 Days',
      goal: newCourse.goal || '',
      lessons: [],
      externalLink: newCourse.externalLink,
      isEmbedded: newCourse.isEmbedded,
    };
    onUpdateCourses([...courses, courseToAdd]);
    setNewCourse({ name: '', description: '', externalLink: '', isEmbedded: true, duration: '21 Days', goal: '' });
    setSelectedCourseId(courseToAdd.id);
    alert('New Course created successfully!');
  };

  const handleAddLesson = () => {
    if (!newLesson.title || !newLesson.youtubeId) {
      alert("Title and YouTube ID are mandatory.");
      return;
    }
    
    const updatedCourses = courses.map(c => {
      if (c.id === selectedCourseId) {
        const lessonToAdd = { ...newLesson, id: c.lessons.length + 1 } as Lesson;
        return { ...c, lessons: [...c.lessons, lessonToAdd] };
      }
      return c;
    });
    
    onUpdateCourses(updatedCourses);
    setNewLesson({
      title: '',
      hinglishTitle: '',
      skill: '',
      tool: '',
      task: '',
      output: '',
      duration: '10 mins',
      youtubeId: ''
    });
    alert('Lesson added to selected course!');
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm("Delete this entire course?")) {
      onUpdateCourses(courses.filter(c => c.id !== id));
    }
  };

  const currentCourse = courses.find(c => c.id === selectedCourseId);

  const generateAIVideo = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setStatus('Initializing Veo Engine...');
    
    try {
      if (!(await (window as any).aistudio.hasSelectedApiKey())) {
        await (window as any).aistudio.openSelectKey();
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setStatus('Processing... This will take a few minutes. Please wait.');
      
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      setStatus(`Success! Video Link Generated.`);
      window.open(`${downloadLink}&key=${process.env.API_KEY}`, '_blank');
    } catch (error: any) {
      console.error(error);
      setStatus('Error: ' + (error.message || 'Generation failed. Check API Key.'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 px-3 py-1 rounded font-black text-xl">SB</div>
          <div>
            <h1 className="text-lg font-bold leading-none">Admin Control Center</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Skill Management System</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onBackToSite}
            className="text-sm font-bold text-slate-400 hover:text-white transition"
          >
            Go to Student View
          </button>
          <button 
            onClick={onLogout}
            className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs">A</span>
              Course Factory
            </h2>
            <div className="space-y-4">
               <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Course Name</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500"
                  value={newCourse.name}
                  onChange={e => setNewCourse({...newCourse, name: e.target.value})}
                  placeholder="e.g. Master Freelancing"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Link (Embeddable Link)</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500"
                  value={newCourse.externalLink}
                  onChange={e => setNewCourse({...newCourse, externalLink: e.target.value})}
                  placeholder="URL for Iframe (Docs, Sheets, YT)"
                />
              </div>
              <div className="flex items-center gap-2 py-2">
                <input 
                  type="checkbox" 
                  id="embedToggle"
                  checked={newCourse.isEmbedded}
                  onChange={e => setNewCourse({...newCourse, isEmbedded: e.target.checked})}
                  className="w-5 h-5 accent-indigo-600"
                />
                <label htmlFor="embedToggle" className="text-sm font-bold text-gray-700 cursor-pointer">
                  Embed this resource on dashboard?
                </label>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Description</label>
                <textarea 
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 h-20"
                  value={newCourse.description}
                  onChange={e => setNewCourse({...newCourse, description: e.target.value})}
                />
              </div>
              <button 
                onClick={handleAddCourse}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
              >
                Create & Upload Course
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-black mb-6">Manage All Courses</h2>
            <div className="space-y-3">
              {courses.map(c => (
                <div 
                  key={c.id} 
                  className={`p-4 rounded-2xl border flex justify-between items-center transition cursor-pointer ${selectedCourseId === c.id ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-slate-100 bg-white hover:border-indigo-200'}`}
                  onClick={() => setSelectedCourseId(c.id)}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="font-bold text-slate-800 text-sm truncate">{c.name}</h4>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">
                      {c.externalLink ? (c.isEmbedded ? 'Embedded Link' : 'External Link') : `${c.lessons.length} Lessons`}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteCourse(c.id); }}
                    className="text-red-400 hover:text-red-600 p-2"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs">B</span>
              Manage Lessons for: <span className="text-indigo-600 italic">{currentCourse?.name || 'None Selected'}</span>
            </h2>
            
            {currentCourse ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Lesson Title</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500"
                      value={newLesson.title}
                      onChange={e => setNewLesson({...newLesson, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Hinglish Subtitle</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500"
                      value={newLesson.hinglishTitle}
                      onChange={e => setNewLesson({...newLesson, hinglishTitle: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">YouTube Video ID</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500"
                      value={newLesson.youtubeId}
                      onChange={e => setNewLesson({...newLesson, youtubeId: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Tool Category</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500"
                      value={newLesson.tool}
                      onChange={e => setNewLesson({...newLesson, tool: e.target.value})}
                    />
                  </div>
                </div>
                <button 
                  onClick={handleAddLesson}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition"
                >
                  Add Lesson to Curriculum
                </button>
              </>
            ) : (
              <p className="text-center text-slate-400 py-10">Select a course from the left to manage its lessons.</p>
            )}
          </div>

          {currentCourse && currentCourse.lessons.length > 0 && (
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-black mb-6">Current Curriculum ({currentCourse.lessons.length} Lessons)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCourse.lessons.map(l => (
                  <div key={l.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-start group">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{l.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">YT: {l.youtubeId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20">🎥</div>
              <div>
                <h3 className="text-2xl font-black">Veo 3.1 Content Engine</h3>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Generate Video Promos for Courses</p>
              </div>
            </div>
            <textarea 
              placeholder="e.g., A cinematic introduction of a student becoming a master designer using AI tools in a small Indian village..." 
              className="w-full bg-slate-800 border-none rounded-3xl p-6 text-sm mb-6 h-40 focus:ring-2 focus:ring-orange-500 text-white placeholder:text-slate-600"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
            <button 
              onClick={generateAIVideo}
              disabled={isGenerating || !prompt}
              className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 ${
                isGenerating || !prompt 
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                : 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-[1.01] shadow-xl shadow-orange-900/20'
              }`}
            >
              {isGenerating ? 'AI is Rendering...' : 'Create Promotional Video'}
            </button>
            {status && (
              <div className="mt-6 p-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-orange-400 font-bold uppercase mb-1">Engine Status</p>
                <p className="text-xs text-slate-300 leading-relaxed">{status}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
