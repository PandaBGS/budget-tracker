import React from 'react';
import { Terminal, Trash2 } from 'lucide-react';

const TransactionList = ({ transactions, deleteTransaction, formatCurrency, formatDate }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="border-2 border-green-400 p-6 bg-black">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          LOG TRANSAKSI
        </h2>

        {transactions.length === 0 ? (
          <div className="text-center py-12 opacity-70">
            <div className="text-sm mb-2">Tidak ada transaksi yang ditemukan di database</div>
            <div className="text-xs">Jalankan transaksi baru untuk memulai pencatatan</div>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((trans) => (
              <div
                key={trans.id}
                className="border border-green-400 p-4 hover:bg-green-950 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 text-xs border ${
                        trans.type === 'income' 
                          ? 'border-green-300 text-green-300' 
                          : 'border-red-400 text-red-400'
                      }`}>
                        {trans.type.toUpperCase()}
                      </span>
                      <span className="font-bold">{trans.category}</span>
                    </div>
                    {trans.description && (
                      <div className="text-sm opacity-70 mb-2">{trans.description}</div>
                    )}
                    <div className="text-xs opacity-50">{formatDate(trans.created_at)}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-xl font-bold ${
                      trans.type === 'income' ? 'text-green-300' : 'text-red-400'
                    }`}>
                      {trans.type === 'income' ? '+' : '-'}{formatCurrency(trans.amount)}
                    </div>
                    <button
                      onClick={() => deleteTransaction(trans.id)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
