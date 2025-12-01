import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import ExternalLinks from './components/ExternalLinks';
import ResultDisplay from './components/ResultDisplay';
import NotesEditor from './components/NotesEditor';
import AuthScreen from './components/AuthScreen';
import { generateContent } from './services/geminiService';
import { NOTE_TYPES } from './constants';
import { Source, User } from './types';
import { Loader2, Zap, HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';
  });

  // Auth State
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // App State
  const [semester, setSemester] = useState('1');
  const [subject, setSubject] = useState('');
  const [noteType, setNoteType] = useState('detailed');
  const [language, setLanguage] = useState('English');
  const [query, setQuery] = useState('');
  
  const [generatedText, setGeneratedText] = useState('');
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Auth Logic
  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Clear state on logout if desired
    setGeneratedText('');
    setQuery('');
  };

  // Content Generation Logic
  const handleGenerate = useCallback(async (mode: 'notes' | 'questions') => {
    if (!subject) {
      setError("Please select a subject first.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedText('');
    setSources([]);

    let prompt = '';

    if (mode === 'notes') {
      const selectedNoteType = NOTE_TYPES.find(t => t.value === noteType);
      const prefix = selectedNoteType ? selectedNoteType.promptPrefix : NOTE_TYPES[0].promptPrefix;
      prompt = `${prefix} for the MBA subject "${subject}" from Semester ${semester}. Focus on the following concepts and keywords: "${query}". The output should be a well-structured explanation with clear headings. Language: ${language}.`;
    } else {
      prompt = `Generate a long answer (approximately 500 - 1000 words) for the question "${query}" related to the MBA subject "${subject}" from Semester ${semester} in ${language}.`;
    }

    try {
      const result = await generateContent(prompt);
      setGeneratedText(result.text);
      setSources(result.sources);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [semester, subject, noteType, language, query]);

  // If not logged in, show Auth Screen
  if (!user) {
    return (
      <div className={theme === 'dark' ? 'dark' : ''}>
         <AuthScreen onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 transition-colors duration-200">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10 mb-8 border border-gray-100 dark:border-gray-700 transition-colors">
          <Header 
            user={user} 
            theme={theme} 
            toggleTheme={toggleTheme} 
            onLogout={handleLogout} 
          />

          {/* PDF Viewer Placeholder */}
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-center transition-colors">
             <div className="max-w-md mx-auto">
                 <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Notice Board</h3>
                 <p className="text-gray-700 dark:text-gray-300 mb-4">University updates and schedules.</p>
                 <div className="h-40 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500 text-sm">PDF/Schedule Widget Placeholder</span>
                 </div>
             </div>
          </div>

          <hr className="my-8 border-gray-100 dark:border-gray-700" />

          <Controls
            semester={semester}
            setSemester={setSemester}
            subject={subject}
            setSubject={setSubject}
            noteType={noteType}
            setNoteType={setNoteType}
            language={language}
            setLanguage={setLanguage}
          />

          <div className="space-y-2 mb-8">
            <label htmlFor="query" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Type your topics / Keywords / Questions</label>
            <textarea
              id="query"
              rows={3}
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y shadow-sm"
              placeholder="Enter keywords for the subject topic or a custom question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => handleGenerate('notes')}
              disabled={isLoading || !subject}
              className="flex-1 flex items-center justify-center px-6 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:transform active:scale-95"
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <Zap className="w-5 h-5 mr-2" />}
              Generate Notes
            </button>
            <button
              onClick={() => handleGenerate('questions')}
              disabled={isLoading || !subject}
              className="flex-1 flex items-center justify-center px-6 py-4 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 text-lg font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:transform active:scale-95"
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <HelpCircle className="w-5 h-5 mr-2" />}
              Generate Answer
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-xl text-center animate-pulse">
              {error}
            </div>
          )}

          <ExternalLinks />

          <ResultDisplay content={generatedText} sources={sources} isLoading={isLoading} />
        </div>

        {/* Editor Section */}
        {generatedText && (
          <div className="mt-8">
            <NotesEditor initialContent={generatedText} />
          </div>
        )}

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} MGKVP MBA Study Companion. Powered by Gemini.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;
