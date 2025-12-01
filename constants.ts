import { SyllabusData, NoteTypeOption } from './types';

export const SYLLABUS_DATA: SyllabusData = {
  '1': [
    "MANAGEMENT PRINCIPAL AND PROCESS",
    "MANAGERIAL ECONOMICS",
    "BUSINESS STATISTICS",
    "BUSINESS ENVIRONMENT",
    "ACCOUNTING FOR MANAGERS",
    "COMPUTER APPLICATION IN MANAGEMENT",
    "BUSINESS LAW",
    "BUSINESS COMMUNICATION"
  ],
  '2': [
    "ORGANIZATIONAL BEHAVIOUR",
    "MANAGERIAL ACCOUNTING",
    "RESEARCH METHODOLOGY",
    "PRODUCTION AND OPERATIONS MANAGEMENT",
    "MARKETING MANAGEMENT",
    "FINANCIAL MANAGEMENT",
    "HUMAN RESOURCE MANAGEMENT"
  ],
  '3': [
    "ENTREPRENEURSHIP DEVELOPMENT AND PROJECT MANAGEMENT",
    "MANAGEMENT SCIENCES",
    "INTERNATIONAL BUSINESS MANAGEMENT",
    "SPECIALIZATION - MARKETING",
    "SPECIALIZATION - FINANCE",
    "SPECIALIZATION - HUMAN RESOURCE MANAGEMENT",
    "SPECIALIZATION - INFORMATION TECHNOLOGY"
  ],
  '4': [
    "CORPORATE MANAGEMENT",
    "STRATEGIC MANAGEMENT",
    "MANAGEMENT INFORMATION SYSTEM",
    "RURAL MANAGEMENT",
    "OPTIONAL - INTERNATIONAL MARKETING",
    "OPTIONAL - MARKETING OF SERVICES",
    "OPTIONAL - SECURITY ANALYSIS AND PORTFOLIO MANAGEMENT",
    "OPTIONAL - CORPORATE TAX MANAGEMENT",
    "OPTIONAL - ORGANIZATIONAL CHANGE AND INTERVENTION STRATEGIES",
    "OPTIONAL - MANAGEMENT TRAINING AND DEVELOPMENT",
    "OPTIONAL - BUSINESS PROCESS RE ENGINEERING AND ERP",
    "OPTIONAL - COMPUTER GRAPHICS AND MULTIMEDIA MANAGEMENT"
  ]
};

export const NOTE_TYPES: NoteTypeOption[] = [
  { value: 'detailed', label: 'Detailed Notes (500+ Words)', promptPrefix: 'Generate a detailed and comprehensive study guide of at least 500 - 1000 words.' },
  { value: 'case_study', label: 'Case Study / Examples', promptPrefix: 'Provide case studies and examples related to the topic from India and the world in detail.' },
  { value: 'simpler', label: 'Simpler Explanation', promptPrefix: 'Explain the concept in simple, easy-to-understand language, in at least 500 words.' },
  { value: 'in_depth', label: 'In-Depth Analysis', promptPrefix: 'Provide an in-depth analytical overview of the topic.' },
  { value: 'short_notes', label: 'Short bullet notes', promptPrefix: 'Generate concise, bullet-pointed notes, yet detailed covering all parts for last-minute revision.' }
];

export const LANGUAGES = [
  'English',
  'Hindi',
  'Spanish',
  'German'
];

export const UNIVERSITY_LINKS = [
  { label: 'BHU MBA', url: 'https://www.bhu.ac.in/Images/files/MBA%20Course%20Structure%202012-13%20onwards.pdf' },
  { label: 'BHU MBA IB', url: 'https://www.bhu.ac.in/Content/Syllabus/Syllabus_3309720200412010054.pdf' },
  { label: 'MGKVP MBA', url: 'https://www.mgkvp.ac.in/Uploads/SyllabusHome/M.B.A._193.pdf' }
];
