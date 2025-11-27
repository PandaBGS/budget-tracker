const parseVoiceInput = (text) => {
  const lowerText = text.toLowerCase();
  let type = 'expense';
  let amount = 0;
  let category = 'Lainnya';
  
  if (lowerText.includes('pemasukan') || lowerText.includes('gaji') || lowerText.includes('dapat')) {
    type = 'income';
  }
  
  const amountMatch = text.match(/\d+/);
  if (amountMatch) {
    amount = parseInt(amountMatch[0]);
  }
  
  const categories = {
    'gaji': 'Gaji',
    'freelance': 'Freelance',
    'bisnis': 'Bisnis',
    'investasi': 'Investasi',
    'makanan': 'Makanan',
    'transportasi': 'Transportasi',
    'belanja': 'Belanja',
    'tagihan': 'Tagihan',
    'hiburan': 'Hiburan',
    'kesehatan': 'Kesehatan',
    'pendidikan': 'Pendidikan',
    'lainnya': 'Lainnya'
  };

  for (const key in categories) {
    if (lowerText.includes(key)) {
      category = categories[key];
      if (['Gaji', 'Freelance', 'Bisnis', 'Investasi'].includes(category)) {
        type = 'income';
      }
      break;
    }
  }
  
  return { type, amount, category, description: text };
};

export default parseVoiceInput;
