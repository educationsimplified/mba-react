import React, { useEffect } from 'react';
import { SYLLABUS_DATA, NOTE_TYPES, LANGUAGES } from '../constants';
import { NoteTypeOption } from '../types';

interface ControlsProps {
  semester: string;
  setSemester: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
  noteType: string;
  setNoteType: (val: string) => void;
  language: string;
  setLanguage: (val: string) => void;
}

const Controls: React.FC<ControlsProps> = ({
  semester,
  setSemester,
  subject,
  setSubject,
  noteType,
  setNoteType,
  language,
  setLanguage,
}) => {
  const availableSubjects = SYLLABUS_DATA[semester] || [];

  // Reset subject when semester changes if current subject is not in new list
  useEffect(() => {
    if (!availableSubjects.includes(subject)) {
      setSubject('');
    }
  }, [semester, availableSubjects, subject, setSubject]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="space-y-1.5">
        <label htmlFor="semester" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Semester</label>
        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
        >
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
          <option value="3">3rd Semester</option>
          <option value="4">4th Semester</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Subject</label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={availableSubjects.length === 0}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:text-gray-400 dark:disabled:text-gray-600"
        >
          <option value="" disabled>Select Subject</option>
          {availableSubjects.map((sub) => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="noteType" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Notes Content Type</label>
        <select
          id="noteType"
          value={noteType}
          onChange={(e) => setNoteType(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
        >
          {NOTE_TYPES.map((type: NoteTypeOption) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="language" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Language</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Controls;
