import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';

const API_URL = import.meta.env.VITE_API_URL;

const AddTransactionPage = () => {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const catRes = await fetch(`${API_URL}/categories`);
      const catData = await catRes.json();
      setCategories(catData.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
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
        navigate('/history');
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <TransactionForm
      showForm={true}
      setShowForm={() => {}}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      categories={categories}
    />
  );
};

export default AddTransactionPage;
