
import React from 'react';
import { TELEGRAM_RULES } from '../constants';

export const CommunitySection: React.FC = () => {
  return (
    <section id="community" className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900">Telegram Community System</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Sikhna mushkil hai, lekin saath me sikhna aasaan hai. Humara Telegram group disciplined hai, jahan sirf kaam ki baatein hoti hain.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M11 7h2v6h-2zm0 8h2v2h-2z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Daily Discipline</h4>
                <p className="text-gray-600 text-sm">Every morning 8 AM task notification. Every evening 8 PM task submission check.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-xl shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5s-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Peer Help System</h4>
                <p className="text-gray-600 text-sm">Agar aap fasein hain, toh community se puchiye. Rule: Ek question puchne se pehle do logon ki help karein.</p>
              </div>
            </div>
          </div>

          <button className="mt-10 bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-600 transition shadow-xl shadow-blue-100">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.35-.01-1.02-.2-1.51-.37-.62-.2-1.11-.31-1.07-.65.02-.18.27-.36.75-.55 2.95-1.28 4.91-2.13 5.88-2.54 2.8-.1.17 1.16-.17 1.71-.54 1.57-.45l.1.1 1.01.31z"/></svg>
            Join the Mission on Telegram
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
          <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Group Rules (Strict)
          </h3>
          <ul className="space-y-4">
            {TELEGRAM_RULES.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="w-6 h-6 bg-gray-200 text-gray-600 text-xs font-bold rounded-full flex items-center justify-center shrink-0">{idx + 1}</span>
                <span className="text-sm text-gray-700 leading-relaxed font-medium">{rule}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-xl text-xs font-medium border border-red-100">
            Note: Anti-spam bot automatic block karta hai. Sirf padhai aur help ki baatein karein.
          </div>
        </div>
      </div>
    </section>
  );
};
