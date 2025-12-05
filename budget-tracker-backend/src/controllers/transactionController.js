
export const createTransaction = async (req, res) => {
  try {
    const { type, category, amount, description } = req.body;

    // 1. Validasi Input Dasar (Kode Lama)
    if (!type || !category || !amount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Type, category, and amount are required' 
      });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Type must be either income or expense' 
      });
    }

    if (amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Amount must be greater than 0' 
      });
    }

    // ---------------------------------------------------------
    // 2. LOGIKA BARU: Cek Saldo Sebelum Pengeluaran
    // ---------------------------------------------------------
    if (type === 'expense') {
      // Ambil semua transaksi untuk menghitung saldo saat ini
      const { data: allTransactions, error: balanceError } = await supabase
        .from('transactions')
        .select('type, amount');

      if (balanceError) throw balanceError;

      // Hitung Saldo (Total Pemasukan - Total Pengeluaran)
      const currentBalance = allTransactions.reduce((acc, curr) => {
        const val = parseFloat(curr.amount);
        return curr.type === 'income' ? acc + val : acc - val;
      }, 0);

      // Cek apakah pengeluaran melebihi saldo
      if (parseFloat(amount) > currentBalance) {
        return res.status(400).json({ 
          success: false, 
          message: 'Transaksi ditolak: Saldo tidak mencukupi' 
        });
      }
    }
    // ---------------------------------------------------------

    // 3. Simpan Transaksi jika lolos pengecekan (Kode Lama)
    const { data, error } = await supabase
      .from('transactions')
      .insert([{ type, category, amount, description }])
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};