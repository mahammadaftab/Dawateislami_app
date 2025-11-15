import { useState } from 'react';
import type { DuroodEntry } from '../types';
import { formatDuroodTimestamp } from '../utils/dateFormatter';

interface HistoryLogProps {
  history: DuroodEntry[];
  onEdit: (id: string, newCount: number) => void;
}

const HistoryLog: React.FC<HistoryLogProps> = ({ history, onEdit }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const startEditing = (entry: DuroodEntry) => {
    setEditingId(entry.id);
    setEditValue(entry.count.toString());
  };

  const saveEdit = (id: string) => {
    const numValue = parseInt(editValue, 10);
    
    if (!isNaN(numValue) && numValue > 0) {
      onEdit(id, numValue);
    }
    
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover-lift animate-scaleIn">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800">History Log</h2>
        </div>
      </div>
      <div className="overflow-y-auto max-h-96">
        {history.length === 0 ? (
          <div className="px-6 py-12 text-center animate-fadeIn">
            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No durood entries yet</h3>
            <p className="text-gray-500">Add your first duroods using the input above to track your spiritual journey</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {history.map((entry, index) => (
              <li 
                key={entry.id} 
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150 animate-staggeredFadeIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {editingId === entry.id ? (
                  <div className="flex items-center space-x-2 animate-scaleIn">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-lg transition-all-medium"
                      min="1"
                      autoFocus
                    />
                    <button
                      onClick={() => saveEdit(entry.id)}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all-medium transform hover:scale-105"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all-medium transform hover:scale-105"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-800 font-bold text-lg transition-all-medium hover:scale-110">
                        {entry.count}
                      </span>
                      <div className="ml-4">
                        <div className="text-gray-900 font-medium">Durood Entry</div>
                        <div className="text-sm text-gray-500">{formatDuroodTimestamp(entry.timestamp)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => startEditing(entry)}
                      className="px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all-medium flex items-center transform hover:scale-105"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryLog;