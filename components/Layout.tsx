
import React from 'react';

export const Navbar: React.FC = () => (
  <nav className="glass sticky top-0 z-50 border-b border-gray-200 px-4 py-3">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">SB</div>
        <span className="font-extrabold text-xl tracking-tight text-gray-900">SkillBharat<span className="text-indigo-600">Open</span></span>
      </div>
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <a href="#mission" className="hover:text-indigo-600 transition">Mission</a>
        <a href="#course" className="hover:text-indigo-600 transition">Course</a>
        <a href="#community" className="hover:text-indigo-600 transition">Community</a>
        <a href="#volunteer" className="hover:text-indigo-600 transition">Volunteer</a>
      </div>
      <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
        Start Learning
      </button>
    </div>
  </nav>
);

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-xl font-bold mb-4">SkillBharat Open</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          100% Free, 100% Practical. <br/>
          Made with ❤️ for Bharat. <br/>
          No Degrees. No Exams. Just Skills.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Quick Links</h4>
        <ul className="text-gray-400 text-sm space-y-2">
          <li><a href="#mission" className="hover:text-white transition">Core Mission</a></li>
          <li><a href="#course" className="hover:text-white transition">AI Course</a></li>
          <li><a href="#volunteer" className="hover:text-white transition">Join as Mentor</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Community</h4>
        <p className="text-gray-400 text-sm mb-4">Join our Telegram for daily updates and peer help.</p>
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-sm font-bold transition">
          Join Telegram Group
        </button>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
      &copy; {new Date().getFullYear()} SkillBharat Open Mission. Open Source & Non-Profit.
    </div>
  </footer>
);
