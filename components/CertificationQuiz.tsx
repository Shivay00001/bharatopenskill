
import React, { useState, useEffect } from 'react';
import { generateQuizQuestions, generateAICertificate } from '../services/geminiService';
import { QuizQuestion } from '../types';

interface CertificationQuizProps {
  studentName: string;
  courseName: string;
  onComplete: () => void;
}

export const CertificationQuiz: React.FC<CertificationQuizProps> = ({ studentName, courseName, onComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingCert, setGeneratingCert] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      const q = await generateQuizQuestions(courseName, ["Prompt Engineering", "AI Image Generation", "Content Strategy", "Productivity"]);
      setQuestions(q);
      setLoading(false);
    };
    loadQuiz();
  }, [courseName]);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    if (index === questions[currentStep].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
      }
    }, 1000);
  };

  const handleGenerateCertificate = async () => {
    setGeneratingCert(true);
    const url = await generateAICertificate(studentName);
    setCertificateUrl(url);
    setGeneratingCert(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[3rem] shadow-xl">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h3 className="text-xl font-bold text-gray-900">AI Teacher aapke liye sawal taiyar kar rahe hain...</h3>
        <p className="text-gray-500 mt-2">Dhairya rakhein, test bas shuru hone wala hai.</p>
      </div>
    );
  }

  if (isFinished) {
    const isPerfect = score === questions.length;
    return (
      <div className="max-w-2xl mx-auto p-10 bg-white rounded-[3rem] shadow-2xl text-center border border-indigo-50">
        <div className="text-6xl mb-6">{isPerfect ? '🎉' : '📚'}</div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Result: {score}/{questions.length}</h2>
        
        {isPerfect ? (
          <div className="mt-8">
            <p className="text-green-600 font-bold text-xl mb-4">Shabaash! 100% Score! Aap Master ban gaye hain.</p>
            {!certificateUrl ? (
              <button 
                onClick={handleGenerateCertificate}
                disabled={generatingCert}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:scale-105 transition disabled:opacity-50"
              >
                {generatingCert ? 'AI Certificate Generate kar raha hai...' : 'AI Generated Certificate Download Karein'}
              </button>
            ) : (
              <div className="mt-8 space-y-6">
                <img src={certificateUrl} alt="Your AI Certificate" className="w-full rounded-2xl shadow-2xl border-4 border-white" />
                <a 
                  href={certificateUrl} 
                  download={`SkillBharat_${studentName}_Certificate.png`}
                  className="inline-block bg-green-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-green-100"
                >
                  Download Certificate 📥
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-red-500 font-bold mb-6">Certificate pane ke liye 100% score chahiye. Thodi aur practice karein!</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold"
            >
              Try Quiz Again
            </button>
          </div>
        )}
        
        <button 
          onClick={onComplete}
          className="mt-10 text-gray-400 hover:text-indigo-600 font-bold underline block mx-auto"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentQ = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto p-10 bg-white rounded-[3rem] shadow-2xl border border-indigo-50">
      <div className="flex justify-between items-center mb-10">
        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Question {currentStep + 1} of {questions.length}</span>
        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">{currentQ.question}</h3>

      <div className="grid grid-cols-1 gap-4">
        {currentQ.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            disabled={selectedOption !== null}
            className={`p-5 rounded-2xl text-left font-semibold border-2 transition-all ${
              selectedOption === idx 
                ? (idx === currentQ.correctAnswer ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                : (selectedOption !== null && idx === currentQ.correctAnswer ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-indigo-600 hover:bg-indigo-50')
            }`}
          >
            <div className="flex gap-4">
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">{String.fromCharCode(65 + idx)}</span>
              {opt}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-2xl text-xs text-gray-400 flex gap-2">
        <span>💡</span>
        Think carefully. No theory, only practical logic of AI tools!
      </div>
    </div>
  );
};
