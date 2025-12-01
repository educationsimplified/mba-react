import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Source } from '../types';

interface ResultDisplayProps {
  content: string;
  sources: Source[];
  isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, sources, isLoading }) => {
  const [showSources, setShowSources] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 animate-pulse transition-colors">
        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Analyzing request and generating content...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-[200px] flex items-center justify-center bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 transition-colors">
        <p className="text-gray-400 dark:text-gray-500 italic text-center">
          Select a subject and generate notes or questions to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="relative border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800 overflow-hidden transition-colors">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide px-2">Generated Output</h3>
        <div className="flex space-x-2">
          {sources.length > 0 && (
            <button
              onClick={() => setShowSources(!showSources)}
              className="flex items-center space-x-1 text-xs font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            >
              <span>{showSources ? 'Hide Sources' : 'Show Sources'}</span>
              {showSources ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
          <button
            onClick={handleCopy}
            className={`flex items-center space-x-1 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
              copied
                ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 overflow-y-auto max-h-[600px] prose prose-blue dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* Sources Section */}
      {showSources && sources.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-900 p-4 transition-colors">
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Sources:</h4>
          <ul className="space-y-1">
            {sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex items-center"
                >
                  <ExternalLink className="w-3 h-3 mr-1.5 inline" />
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
