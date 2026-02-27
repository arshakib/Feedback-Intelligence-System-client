/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function CreateModal({ isOpen, onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({ userName: '', userEmail: '', feedbackText: '', targetTeamEmail: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
    setFormData({ userName: '', userEmail: '', feedbackText: '', targetTeamEmail: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            New Feedback <Sparkles size={20} className="text-yellow-500" />
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full p-2"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input required type="text" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" 
                value={formData.userName} onChange={e => setFormData({...formData, userName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User Email</label>
              <input required type="email" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" 
                value={formData.userEmail} onChange={e => setFormData({...formData, userEmail: e.target.value})} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Message</label>
            <textarea required rows={4} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" 
              placeholder="Describe the issue or suggestion..." value={formData.feedbackText} onChange={e => setFormData({...formData, feedbackText: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Alert Email (Optional)</label>
            <input type="email" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="support@company.com" value={formData.targetTeamEmail} onChange={e => setFormData({...formData, targetTeamEmail: e.target.value})} />
            <p className="text-xs text-gray-400 mt-1">If provided, the AI will route the alert directly to this email.</p>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-70 flex justify-center items-center gap-2 mt-4">
            {loading ? <span className="animate-pulse">AI is analyzing & routing...</span> : 'Analyze & Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}