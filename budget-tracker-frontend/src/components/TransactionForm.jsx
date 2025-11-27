import React from 'react';
import { Terminal, X } from 'lucide-react';

const TransactionForm = ({
  showForm,
  setShowForm,
  formData,
  setFormData,
  handleSubmit,
  categories,
}) => {
  if (!showForm) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="border-2 border-border-color p-6 bg-bg-color relative">
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-4 right-4 hover:text-red-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          INPUT TRANSAKSI
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2 opacity-70">TIPE</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense' })}
                className={`flex-1 p-3 border-2 transition-colors ${
                  formData.type === 'expense'
                    ? 'border-red-400 bg-red-950 text-red-400'
                    : 'border-border-color hover:bg-hover-bg-color'
                }`}
              >
                PENGELUARAN
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income' })}
                className={`flex-1 p-3 border-2 transition-colors ${
                  formData.type === 'income'
                    ? 'border-green-300 bg-green-950 text-green-300'
                    : 'border-border-color hover:bg-hover-bg-color'
                }`}
              >
                PEMASUKAN
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">KATEGORI</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-bg-color border-2 border-border-color p-3 text-text-color focus:outline-none focus:border-green-300"
              required
            >
              <option value="">Pilih kategori...</option>
              {categories
                .filter(cat => cat.type === formData.type)
                .map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))
              }
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">JUMLAH</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-bg-color border-2 border-border-color p-3 text-text-color focus:outline-none focus:border-green-300"
              placeholder="Masukkan jumlah..."
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">DESKRIPSI (Opsional)</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-bg-color border-2 border-border-color p-3 text-text-color focus:outline-none focus:border-green-300"
              placeholder="Masukkan deskripsi..."
            />
          </div>

          <button
            type="submit"
            className="w-full border-2 border-border-color p-4 hover:bg-hover-bg-color transition-colors font-bold"
          >
            JALANKAN TRANSAKSI
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
