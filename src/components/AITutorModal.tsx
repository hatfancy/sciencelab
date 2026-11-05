import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, AlertCircle, RefreshCw, BookOpen, User, ShieldCheck } from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('General Science');
  const [level, setLevel] = useState('High School / General');
  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: 'Greetings, scientist! I am your SciVerse AI Tutor powered by Google Gemini. How can I assist your discoveries today? You can ask me to explain any physical equation, break down a chemical reaction mechanism, interpret your experiment data, or explain why celestial bodies orbit.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  if (!isOpen) return null;

  const quickQuestions = [
    'Why is the sky blue during the day and red at sunset?',
    'How does a rocket engine produce thrust in the vacuum of space?',
    'What is the difference between speed and velocity?',
    'Explain how Archimedes discovered the buoyant force.',
    'Why is solid ice less dense than liquid water?'
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const questionToSend = customPrompt || inputQuestion;
    if (!questionToSend.trim() || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: questionToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputQuestion('');
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionToSend,
          subject,
          level,
          conversationHistory: messages.slice(-4)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to connect to AI Science Tutor server.');
      }

      const tutorMessage: Message = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: data.answer || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, tutorMessage]);
    } catch (err: any) {
      console.error('Tutor API Error:', err);
      setErrorMsg(err.message || 'Error communicating with AI service.');
      const fallbackMessage: Message = {
        id: `tutor-err-${Date.now()}`,
        sender: 'tutor',
        text: `Unable to complete request: ${err.message}. Please ensure the GEMINI_API_KEY environment variable is configured in the AI Studio Secrets panel.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-3xl bg-[#0c1220] border border-slate-700 rounded-xl shadow-2xl flex flex-col h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tutor Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">SciVerse AI Science Tutor</h3>
                <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                  Gemini Powered
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Empirical STEM reasoning, step-by-step problem solver & safety verified
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Bar: Subject & Level Selectors */}
        <div className="px-5 py-2.5 bg-slate-950/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Discipline:</span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-slate-850 text-slate-200 border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="General Science">General Science</option>
              <option value="Chemistry">Chemistry & Reactions</option>
              <option value="Physics">Physics & Motion</option>
              <option value="Astronomy">Astronomy & Space</option>
              <option value="Fluid Dynamics">Fluid Dynamics & Aerodynamics</option>
              <option value="Rocket Engineering">Rocket Engineering</option>
              <option value="Energy & Thermodynamics">Energy & Combustion</option>
              <option value="Biology & Genetics">Biology & Human Body</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Level:</span>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-slate-850 text-slate-200 border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="Beginner / Middle School">Beginner (Visual & Plain English)</option>
              <option value="High School / General">Intermediate (Formulas & Concepts)</option>
              <option value="College / Advanced">Advanced (Calculus, SI Units & Rigor)</option>
            </select>
          </div>
        </div>

        {/* Conversation Message Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-700 text-slate-200'
                    : 'bg-cyan-900/60 text-cyan-400 border border-cyan-700/50'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                <div className="mb-1 text-[10px] text-slate-400 flex items-center justify-between gap-4">
                  <span>{msg.sender === 'user' ? 'You' : 'SciVerse AI Tutor'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div>{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Analyzing scientific principles & formulating response...</span>
            </div>
          )}
        </div>

        {/* Quick Question Starters */}
        <div className="px-5 py-2 border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto flex items-center gap-2 text-[11px]">
          <span className="text-slate-400 shrink-0 font-medium">Quick Queries:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={loading}
              className="px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/60 whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Ask a scientific question, formula derivation, or concept explanation..."
              disabled={loading}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={loading || !inputQuestion.trim()}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-medium flex items-center gap-1.5 transition-colors focus:outline-none"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>

          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Harmful chemical and hazardous weapon instructions are blocked.
            </span>
            <span>SI Unit standard calculations</span>
          </div>
        </div>
      </div>
    </div>
  );
};
