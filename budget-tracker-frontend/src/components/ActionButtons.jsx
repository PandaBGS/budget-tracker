import React from 'react';
import { Plus } from 'lucide-react';

const ActionButtons = ({ showForm, setShowForm }) => {
  return (
    <div className="max-w-6xl mx-auto mb-8 flex gap-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex-1 border-2 border-green-400 p-4 hover:bg-green-950 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span>TRANSAKSI BARU</span>
      </button>
    </div>
  );
};

export default ActionButtons;
