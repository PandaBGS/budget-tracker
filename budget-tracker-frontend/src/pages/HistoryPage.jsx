import React, { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';

const API_URL = import.meta.env.VITE_API_URL;

const HistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const transRes = await fetch(`${API_URL}/transactions`);
      const transData = await transRes.json();
      setTransactions(transData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const res = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-text-color font-mono text-xl animate-pulse">
          Memuat riwayat...
        </div>
      </div>
    );
  }

  return (
    <TransactionList
      transactions={transactions}
      deleteTransaction={deleteTransaction}
      formatCurrency={formatCurrency}
      formatDate={formatDate}
    />
  );
};

export default HistoryPage;
