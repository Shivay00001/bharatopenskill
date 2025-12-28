
import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from './components/Layout';
import { CourseSection } from './components/CourseSection';
import { CommunitySection } from './components/CommunitySection';
import { VolunteerSection } from './components/VolunteerSection';
import { AIAssistant } from './components/AIAssistant';
import { AuthOverlay } from './components/AuthOverlay';
import { LessonPlayer } from './components/LessonPlayer';
import { AdminPanel } from './components/AdminPanel';
import { CertificationQuiz } from './components/CertificationQuiz';
import { ResourceViewer } from './components/ResourceViewer';
import { AI_COURSE } from './constants';
import { Lesson, Course, ViewState } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<{name: string, isAdmin?: boolean} | null>(null);
  const [currentView, setCurrentView] = useState<ViewState | 'admin'>('home');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [allCourses, setAllCourses] = useState<Course[]>([AI_COURSE]);

  useEffect(() => {
    const savedName = localStorage.getItem('sb_username');
    const savedAdmin = localStorage.getItem('sb_is_admin') === 'true';
    const savedCourses = localStorage.getItem('sb_custom_courses');
    
    if (savedCourses) {
      try {
        const parsed = JSON.parse(savedCourses);
        // Ensure legacy courses get the embedded flag if missing
        const hydrated = parsed.map((c: any) => ({ ...c, isEmbedded: c.isEmbedded ?? true }));
        setAllCourses([AI_COURSE, ...hydrated]);
      } catch (e) {
        console.error("Failed to load custom courses");
      }
    }

    if (savedName) {
      setUser({ name: savedName, isAdmin: savedAdmin });
      if (savedAdmin) setCurrentView('admin');
    }
  }, []);

  const handleLogin = (name: string, isAdmin?: boolean) => {
    const userData = { name, isAdmin };
    setUser(userData);
    localStorage.setItem('sb_username', name);
    localStorage.setItem('sb_is_admin', isAdmin ? 'true' : 'false');
    
    if (isAdmin) {
      setCurrentView('admin');
    } else {
      setCurrentView('home');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setCurrentView('home');
  };

  const handleStartCourse = (course: Course) => {
    setActiveCourse(course);
    if (course.externalLink && course.lessons.length === 0) {
      if (course.isEmbedded) {
        setCurrentView('resource');
      } else {
        window.open(course.externalLink, '_blank');
      }
    } else {
      setCurrentView('course');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateAllCourses = (courses: Course[]) => {
    setAllCourses(courses);
    const customOnes = courses.filter(c => c.id !== AI_COURSE.id);
    localStorage.setItem('sb_custom_courses', JSON.stringify(customOnes));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {!user && <AuthOverlay onLogin={handleLogin} />}
      {activeLesson && <LessonPlayer lesson={activeLesson} onClose={() => setActiveLesson(null)} />}
      
      {currentView === 'resource' && activeCourse && (
        <ResourceViewer course={activeCourse} onClose={() => setCurrentView('home')} />
      )}

      {currentView === 'admin' && user?.isAdmin ? (
        <AdminPanel 
          courses={allCourses} 
          onUpdateCourses={handleUpdateAllCourses} 
          onLogout={handleLogout} 
          onBackToSite={() => setCurrentView('home')}
        />
      ) : (
        <>
          <Navbar />
          
          {user?.isAdmin && (
            <div className="bg-indigo-900 text-white text-[10px] font-bold py-1 text-center uppercase tracking-widest sticky top-[64px] z-40 flex items-center justify-center gap-4">
              <span>Admin Mode Active</span>
              <button onClick={() => setCurrentView('admin')} className="underline hover:text-indigo-200">Open Dashboard</button>
            </div>
          )}

          {currentView === 'home' && (
            <main>
              <section className="pt-20 pb-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 inline-block">
                       Hinglish Skill Mission 🇮🇳
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
                      Learn AI Tools. <br/>
                      <span className="text-indigo-600">Start Earning.</span>
                    </h1>
                    <p className="text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
                      Welcome, <strong>{user?.name || 'Dost'}</strong>! Humara mission aapko bina kisi kharche ke market-ready banana hai. No degrees, just real work.
                    </p>
                    <div className="flex gap-4">
                      <button onClick={() => handleStartCourse(allCourses[0])} className="bg-indigo-600 text-white px-8 py-5 rounded-[2rem] font-bold text-xl shadow-2xl shadow-indigo-100 hover:scale-105 transition">
                        Start Learning Now
                      </button>
                      <button onClick={() => setCurrentView('certification')} className="bg-orange-500 text-white px-8 py-5 rounded-[2rem] font-bold text-xl shadow-2xl shadow-orange-100 hover:scale-105 transition">
                        Get Certified 🎓
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-600/10 rounded-[3rem] rotate-3 scale-105"></div>
                    <div className="relative bg-white border border-gray-100 rounded-[3rem] p-4 shadow-2xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" alt="Tech Bharat" className="rounded-[2.5rem] w-full h-[400px] object-cover" />
                      <div className="absolute bottom-10 left-10 right-10 glass p-6 rounded-2xl border border-white/50">
                        <p className="text-gray-900 font-bold">"Skill seekho, certificate nahi."</p>
                        <p className="text-xs text-gray-500">- Bharat Mission Philosophy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="course-preview" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="flex justify-between items-end mb-12">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900">Available Courses</h2>
                      <p className="text-gray-500">Free hamesha ke liye. Admin curated.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allCourses.map(course => (
                      <div key={course.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition flex flex-col">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
                          {course.thumbnailUrl ? <img src={course.thumbnailUrl} className="w-10 h-10 object-contain" /> : '🤖'}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            {course.description || `${course.lessons.length} Lessons active now. AI se content, design aur coding sikhein.`}
                          </p>
                        </div>
                        <button 
                          onClick={() => handleStartCourse(course)} 
                          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold mt-auto hover:bg-indigo-700 transition"
                        >
                          {course.externalLink && course.lessons.length === 0 ? (course.isEmbedded ? 'View Resource 📥' : 'Open Link 🔗') : 'Start Course'}
                        </button>
                      </div>
                    ))}
                    
                    <div className="bg-gray-100 p-8 rounded-[2.5rem] border border-dashed border-gray-300 opacity-60 flex flex-col justify-center items-center text-center">
                       <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">More coming soon</p>
                       <h3 className="text-xl font-bold text-gray-500">Curated by Bharat Community</h3>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          )}

          {currentView === 'course' && activeCourse && (
            <div className="flex-1 pb-20">
               <div className="max-w-4xl mx-auto px-4 py-12">
                  <div className="flex justify-between items-center mb-8">
                    <button onClick={() => setCurrentView('home')} className="text-gray-400 hover:text-indigo-600 font-bold flex items-center gap-2">
                      ← Back to Dashboard
                    </button>
                    <button 
                      onClick={() => setCurrentView('certification')}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg"
                    >
                      Final Exam & Cert 🎓
                    </button>
                  </div>
                  <div className="mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">{activeCourse.name}</h1>
                    <p className="text-gray-500 italic">Curriculum curated for {user?.name}</p>
                  </div>
                  <div className="space-y-4">
                    {activeCourse.lessons.length > 0 ? activeCourse.lessons.map(l => (
                      <div 
                        key={l.id} 
                        onClick={() => setActiveLesson(l)}
                        className="p-6 bg-white border border-gray-100 rounded-3xl flex items-center justify-between cursor-pointer hover:border-indigo-600 hover:shadow-lg transition"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl font-black">
                            {l.id}
                          </span>
                          <div>
                            <h4 className="font-bold text-gray-900">{l.title}</h4>
                            <p className="text-xs text-gray-500">{l.hinglishTitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="hidden md:inline text-xs font-bold text-gray-400 uppercase">{l.duration}</span>
                          <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-full">▶</div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                         <p className="text-gray-400">No specific lessons added yet.</p>
                         {activeCourse.externalLink && (
                           <button 
                             onClick={() => handleStartCourse(activeCourse)}
                             className="mt-4 bg-indigo-100 text-indigo-600 px-6 py-2 rounded-xl font-bold"
                           >
                             Open Main Resource
                           </button>
                         )}
                      </div>
                    )}
                  </div>
               </div>
            </div>
          )}

          {currentView === 'certification' && (
            <div className="flex-1 p-10">
              <CertificationQuiz 
                studentName={user?.name || 'Student'} 
                courseName={activeCourse?.name || allCourses[0].name}
                onComplete={() => setCurrentView('home')}
              />
            </div>
          )}

          {currentView === 'assistant' && (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
               <div className="w-full max-w-4xl">
                  <button onClick={() => setCurrentView('home')} className="mb-4 text-gray-400 font-bold">← Close Assistant</button>
                  <AIAssistant />
               </div>
            </div>
          )}

          {currentView !== 'assistant' && currentView !== 'certification' && <CommunitySection />}
          {currentView !== 'assistant' && currentView !== 'certification' && <VolunteerSection />}
          
          <Footer />

          {currentView !== 'assistant' && currentView !== 'certification' && (
            <button 
              onClick={() => setCurrentView('assistant')}
              className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition z-40"
            >
              👨‍🏫
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;
