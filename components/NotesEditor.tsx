import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, Eraser, FileText, File } from 'lucide-react';

interface NotesEditorProps {
  initialContent: string;
}

declare global {
  interface Window {
    html2pdf: any;
  }
}

const NotesEditor: React.FC<NotesEditorProps> = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [filename, setFilename] = useState('study-notes');
  const [previewContent, setPreviewContent] = useState(initialContent);

  // Update local content when initialContent changes (e.g. new generation)
  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
      setPreviewContent(initialContent);
    }
  }, [initialContent]);

  const handleApply = () => {
    setPreviewContent(content);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the editor?")) {
      setContent('');
      setPreviewContent('');
    }
  };

  const generatePDF = (orientation: 'portrait' | 'landscape') => {
    if (!window.html2pdf) {
      alert("PDF library not loaded. Please check your internet connection.");
      return;
    }

    const element = document.createElement('div');
    // Basic styling for the PDF content - FORCE Light mode for PDF
    element.style.fontFamily = "'Open Sans', 'Noto Sans Devanagari', sans-serif";
    element.style.padding = '20px';
    element.style.background = '#fff';
    element.style.color = '#000';

    // Process content into paragraphs for better break handling
    const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
    
    if (paragraphs.length === 0) {
        const p = document.createElement('p');
        p.textContent = content || "No notes content.";
        element.appendChild(p);
    } else {
        paragraphs.forEach(text => {
            const p = document.createElement('p');
            p.style.fontSize = `${fontSize}px`;
            p.style.lineHeight = `${lineHeight}`;
            p.style.marginBottom = '1em';
            p.style.whiteSpace = 'pre-wrap';
            // CSS for page break avoidance
            p.style.pageBreakInside = 'avoid';
            p.style.breakInside = 'avoid';
            p.textContent = text;
            element.appendChild(p);
        });
    }

    const opt = {
      margin: 10,
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: orientation },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    window.html2pdf().set(opt).from(element).save();
  };

  const generateDoc = () => {
    const docFilename = `${filename}.doc`;
    
    const paragraphs = content
      .split('\n\n')
      .map(p => `<p style="font-size: ${fontSize}px; line-height: ${lineHeight}; margin-bottom: 1em;">${p.replace(/\n/g, '<br/>')}</p>`)
      .join('');

    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>${docFilename}</title>
          <style>
            body { font-family: 'Open Sans', 'Noto Sans Devanagari', sans-serif; }
          </style>
        </head>
        <body>
          ${paragraphs}
        </body>
      </html>`;

    const url = 'data:application/msword;charset=utf-8,' + encodeURIComponent(html);
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = url;
    downloadLink.download = docFilename;
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="space-y-6">
      
      {/* Editor Controls */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Notes Editor</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">Refine your notes before downloading</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm bg-white dark:bg-gray-750 text-gray-900 dark:text-gray-100 transition-colors"
            placeholder="Edit your notes here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Font Size ({fontSize}px)</label>
                 <input 
                    type="range" 
                    min="10" 
                    max="32" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                 />
            </div>
             <div className="space-y-2">
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Line Height ({lineHeight})</label>
                 <input 
                    type="range" 
                    min="1" 
                    max="2.5" 
                    step="0.1"
                    value={lineHeight} 
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                 />
            </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={handleApply} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition text-sm font-medium shadow-sm">
             <RefreshCw className="w-4 h-4 mr-2" /> Apply Changes to Preview
          </button>
          <button onClick={handleClear} className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition text-sm font-medium shadow-sm">
             <Eraser className="w-4 h-4 mr-2" /> Clear Editor
          </button>
        </div>
      </section>

      {/* Preview */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Live Preview</h2>
        {/* Preview box is deliberately kept light to simulate PDF output */}
        <div 
            className="min-h-[300px] bg-white text-black border border-dashed border-gray-300 rounded-lg p-6 overflow-x-hidden whitespace-pre-wrap"
            style={{ 
                fontSize: `${fontSize}px`, 
                lineHeight: lineHeight,
                fontFamily: "'Open Sans', 'Noto Sans Devanagari', sans-serif" 
            }}
        >
          {previewContent || <span className="text-gray-400 italic">Preview area (simulates PDF output)...</span>}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Note: The preview background is always white to represent the final document.</p>
      </section>

      {/* Download */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
         <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Export Options</h2>
         <div className="flex flex-col sm:flex-row gap-4 items-center">
             <div className="flex-1 w-full sm:w-auto">
                 <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Filename</label>
                 <input 
                    type="text" 
                    value={filename} 
                    onChange={(e) => setFilename(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-750 text-gray-900 dark:text-white"
                 />
             </div>
             <div className="flex gap-3 flex-wrap justify-center w-full sm:w-auto pt-5">
                 <button onClick={() => generatePDF('portrait')} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium shadow-sm">
                    <File className="w-4 h-4 mr-2" /> PDF (Portrait)
                 </button>
                 <button onClick={() => generatePDF('landscape')} className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium shadow-sm">
                    <File className="w-4 h-4 mr-2" /> PDF (Landscape)
                 </button>
                 <button onClick={generateDoc} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium shadow-sm">
                    <FileText className="w-4 h-4 mr-2" /> Word DOC
                 </button>
             </div>
         </div>
      </section>
    </div>
  );
};

export default NotesEditor;
