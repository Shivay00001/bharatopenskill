
import React, { useState, useRef } from 'react';
import { askVirtualTeacher, solveFromImage } from '../services/geminiService';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setInput('');
    setLoading(true);
    const res = await askVirtualTeacher(userMsg);
    setMessages(prev => [...prev, {role: 'ai', text: res}]);
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setMessages(prev => [...prev, {role: 'user', text: "[Image Uploaded] Iska logic samjhayein."}]);
      setLoading(true);
      const res = await solveFromImage(base64, "Describe what is in this image and provide helpful feedback in Hinglish.");
      setMessages(prev => [...prev, {role: 'ai', text: res}]);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-50">
      <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
        <div>
          <h3 className="font-bold">Virtual Teacher: Bhartiya AI Guru</h3>
          <p className="text-xs opacity-80">Online & Ready to Help</p>
        </div>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">👨‍🏫</div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">Puchiye apna doubt! <br/> Aap photo bhi bhej sakte hain.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-indigo-600 animate-bounce">AI is thinking...</div>}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
        >
          📷
        </button>
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Apna sawaal likhein..."
          className="flex-1 bg-gray-50 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          onClick={handleSend}
          className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition"
        >
          🚀
        </button>
      </div>
    </div>
  );
};
