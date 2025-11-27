import React, { useState, useEffect } from 'react';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import parseVoiceInput from './utils/voiceParser';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import ActionButtons from './components/ActionButtons';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Footer from './components/Footer';

const API_URL = import.meta.env.VITE_API_URL;






const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (transcript) {
      const parsed = parseVoiceInput(transcript);
      setFormData({
        type: parsed.type,
        category: parsed.category,
        amount: parsed.amount.toString(),
        description: parsed.description
      });
      setShowForm(true);
    }
  }, [transcript]);

  const fetchData = async () => {
    try {
      const [transRes, summaryRes, catRes] = await Promise.all([
        fetch(`${API_URL}/transactions`),
        fetch(`${API_URL}/transactions/summary`),
        fetch(`${API_URL}/categories`)
      ]);
      
      const transData = await transRes.json();
      const summaryData = await summaryRes.json();
      const catData = await catRes.json();
      
      setTransactions(transData.data || []);
      setSummary(summaryData.data || { totalIncome: 0, totalExpense: 0, balance: 0 });
      setCategories(catData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return;

    try {
      const res = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount)
        })
      });

      if (res.ok) {
        setFormData({ type: 'expense', category: '', amount: '', description: '' });
        setShowForm(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 font-mono text-xl animate-pulse">
          Loading system...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 md:p-8">
      <Header />

      <SummaryCards summary={summary} formatCurrency={formatCurrency} />

      <ActionButtons
        showForm={showForm}
        setShowForm={setShowForm}
        isListening={isListening}
        startListening={startListening}
        stopListening={stopListening}
      />

      <TransactionForm
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        categories={categories}
      />

      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />

      <Footer />
    </div>
  );
};


export default App;