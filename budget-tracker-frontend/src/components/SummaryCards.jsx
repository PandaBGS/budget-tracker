import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = ({ summary, formatCurrency }) => {
  return (
    <div className="max-w-6xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border-2 border-green-400 p-4 hover:bg-green-950 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm opacity-70">SALDO</span>
          <DollarSign className="w-5 h-5" />
        </div>
        <div className="text-2xl font-bold">{formatCurrency(summary.balance)}</div>
        <div className="text-xs mt-1 opacity-70">Saldo sistem saat ini</div>
      </div>

      <div className="border-2 border-green-400 p-4 hover:bg-green-950 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm opacity-70">PEMASUKAN</span>
          <TrendingUp className="w-5 h-5" />
        </div>
        <div className="text-2xl font-bold text-green-300">{formatCurrency(summary.totalIncome)}</div>
        <div className="text-xs mt-1 opacity-70">Total kredit yang diterima</div>
      </div>

      <div className="border-2 border-green-400 p-4 hover:bg-green-950 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm opacity-70">PENGELUARAN</span>
          <TrendingDown className="w-5 h-5" />
        </div>
        <div className="text-2xl font-bold text-red-400">{formatCurrency(summary.totalExpense)}</div>
        <div className="text-xs mt-1 opacity-70">Total debit yang diproses</div>
      </div>
    </div>
  );
};

export default SummaryCards;
