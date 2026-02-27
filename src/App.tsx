/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Plus, Search, Filter, Inbox } from 'lucide-react';
import type { IFeedback } from './types';
import FeedbackCard from './components/FeedbackCard';
import CreateModal from './components/CreateModal';

const API_URL = 'http://localhost:5000/api/feedbacks';

export default function App() {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const[priority, setPriority] = useState('');

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get(API_URL, { params: { search, category, priority } });
      setFeedbacks(data.data);
    } catch {
      toast.error('Failed to load feedback');
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { fetchFeedbacks(); }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, category, priority]);

  const handleCreateFeedback = async (formData: any) => {
    try {
      await axios.post(API_URL, formData);
      toast.success('Successfully analyzed and routed!');
      setIsModalOpen(false);
      fetchFeedbacks();
    } catch {
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans p-6 md:p-10">
      <Toaster position="top-center" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Feedback Intelligence</h1>
            <p className="text-gray-500 mt-1">AI-powered routing, analysis, and management.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm shadow-indigo-200 transition-all flex items-center gap-2">
            <Plus size={20} /> Add Feedback
          </button>
        </div>

        {/* Filters section */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input type="text" placeholder="Search by user name..." 
              className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="relative flex-1">
             <Filter className="absolute left-4 top-3.5 text-gray-400" size={18} />
             <input type="text" placeholder="Filter category (e.g. Bug)" 
              className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <select 
            className="flex-1 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 text-gray-600 transition-all appearance-none"
            value={priority} onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Grid Display */}
        {feedbacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((fb) => ( <FeedbackCard key={fb._id} feedback={fb} /> ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-indigo-50 p-4 rounded-full mb-4">
              <Inbox size={32} className="text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No feedback found</h3>
            <p className="text-gray-500">Try adjusting your filters or add a new one.</p>
          </div>
        )}
      </div>

      <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateFeedback} />
    </div>
  );
}