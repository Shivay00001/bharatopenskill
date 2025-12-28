
import React, { useState } from 'react';

export const AuthOverlay: React.FC<{ 
  onLogin: (name: string, isAdmin?: boolean) => void 
}> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'user' | 'admin'>('user');

  const handleAction = () => {
    if (mode === 'admin') {
      if (name === 'open@shivay.education' && password === 'openlearning@toolcell') {
        onLogin('Admin', true);
      } else {
        alert('Invalid Admin Credentials');
      }
    } else {
      if (name) onLogin(name, false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-indigo-900 flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative z-10 text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black rotate-12 shadow-xl">
          SB
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setMode('user')}
            className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition ${mode === 'user' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setMode('admin')}
            className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition ${mode === 'admin' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400'}`}
          >
            Admin
          </button>
        </div>

        <h2 className="text-3xl font-black text-gray-900 mb-2">
          {mode === 'admin' ? 'Admin Login' : 'Namaste!'}
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          {mode === 'admin' ? 'Enter system credentials to manage platform.' : 'SkillBharat Mission me aapka swagat hai.'}
        </p>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder={mode === 'admin' ? "Admin ID" : "Apna Pura Naam"}
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-indigo-600 focus:outline-none transition"
          />
          
          {mode === 'admin' && (
            <input 
              type="password" 
              placeholder="Admin Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-indigo-600 focus:outline-none transition"
            />
          )}
        </div>
        
        <button 
          disabled={!name || (mode === 'admin' && !password)}
          onClick={handleAction}
          className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {mode === 'admin' ? 'Enter Dashboard' : 'Mission Start Karein 🚀'}
        </button>

        <p className="mt-8 text-xs text-gray-400">
          Secure non-profit platform. <br/>
          Free. Open. Non-monetized.
        </p>
      </div>
    </div>
  );
};
