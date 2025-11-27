import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>
      <div className="flex items-center justify-between">
        <span className="text-lg">Tema</span>
        <button
          onClick={toggleTheme}
          className="border-2 border-green-400 p-2 hover:bg-green-950 transition-colors"
        >
          Ganti ke Mode {theme === 'dark' ? 'Terang' : 'Gelap'}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
