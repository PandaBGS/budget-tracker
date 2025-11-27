import React from 'react';
import { Mic, Plus } from 'lucide-react';

const ActionButtons = ({ showForm, setShowForm, isListening, startListening, stopListening }) => {
  return (
    <div className="max-w-6xl mx-auto mb-8 flex gap-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex-1 border-2 border-green-400 p-4 hover:bg-green-950 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span>TRANSAKSI BARU</span>
      </button>
      
      <button
        onClick={isListening ? stopListening : startListening}
        className={`border-2 p-4 transition-colors flex items-center justify-center gap-2 ${
          isListening 
            ? 'border-red-400 bg-red-950 text-red-400 animate-pulse' 
            : 'border-green-400 hover:bg-green-950'
        }`}
      >
        <Mic className="w-5 h-5" />
        <span className="hidden md:inline">{isListening ? 'MENDENGARKAN...' : 'INPUT SUARA'}</span>
      </button>
    </div>
  );
};

export default ActionButtons;
