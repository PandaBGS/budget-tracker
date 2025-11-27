import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const summaryRes = await fetch(`${API_URL}/transactions/summary`);
      const summaryData = await summaryRes.json();
      setSummary(summaryData.data || { totalIncome: 0, totalExpense: 0, balance: 0 });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-text-color font-mono text-xl animate-pulse">
          Memuat sistem...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="border-2 border-border-color p-4 hover:bg-hover-bg-color transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm opacity-70">SALDO</span>
          <DollarSign className="w-5 h-5" />
        </div>
        <div className="text-2xl font-bold">{formatCurrency(summary.balance)}</div>
        <div className="text-xs mt-1 opacity-70">Saldo sistem saat ini</div>
      </div>
    </div>
  );
};

export default HomePage;
