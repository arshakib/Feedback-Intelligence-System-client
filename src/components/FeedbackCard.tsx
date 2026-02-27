import type { IFeedback } from '../types';
import { Tag, Heart, Building2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function FeedbackCard({ feedback }: { feedback: IFeedback }) {
  const priorityColors = {
    Critical: 'bg-red-100 text-red-700 border-red-200',
    High: 'bg-orange-100 text-orange-700 border-orange-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const sentimentColors = {
    Positive: 'text-green-600',
    Neutral: 'text-gray-500',
    Negative: 'text-red-500',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
            {feedback.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{feedback.userName}</h3>
            <p className="text-xs text-gray-500">{feedback.userEmail}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityColors[feedback.priority]}`}>
          {feedback.priority}
        </span>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed grow">"{feedback.feedbackText}"</p>
      <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
          <Tag size={14} className="text-indigo-500" /> {feedback.category}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
          <Building2 size={14} className="text-indigo-500" /> {feedback.team} Team
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
          <Heart size={14} className={sentimentColors[feedback.sentiment]} /> {feedback.sentiment}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
          <Calendar size={14} /> {format(new Date(feedback.createdAt), 'MMM dd, yyyy')}
        </div>
      </div>
    </div>
  );
}