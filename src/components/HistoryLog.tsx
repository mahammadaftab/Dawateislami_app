import React, { useState } from 'react';
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">History Log</h2>
      </div>
      <div className="overflow-y-auto max-h-96">
        {history.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <p>No durood entries yet. Add your first durood above!</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {history.map((entry) => (
              <li 
                key={entry.id} 
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150 animate-fadeIn"
              >
                {editingId === entry.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-lg"
                      min="1"
                      autoFocus
                    />
                    <button
                      onClick={() => saveEdit(entry.id)}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-bold">
                        {entry.count}
                      </span>
                      <span className="ml-4 text-gray-600">Durood</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">
                        {formatDuroodTimestamp(entry.timestamp)}
                      </div>
                      <button
                        onClick={() => startEditing(entry)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
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