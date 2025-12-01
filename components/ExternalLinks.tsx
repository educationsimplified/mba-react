import React from 'react';
import { UNIVERSITY_LINKS } from '../constants';
import { ExternalLink } from 'lucide-react';

const ExternalLinks: React.FC = () => {
  return (
    <div className="space-y-3 mb-8">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">University Syllabus & Resources</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {UNIVERSITY_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all font-medium text-sm group"
          >
            {link.label}
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExternalLinks;
