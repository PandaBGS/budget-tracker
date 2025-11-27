import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Home, Plus, History, User, Settings } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-bg-color text-text-color font-mono flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
      <nav className="border-t-2 border-border-color p-4 bg-bg-color flex justify-around">
        <Link to="/" className="flex flex-col items-center gap-1 hover:text-green-300">
          <Home className="w-6 h-6" />
          <span className="text-xs">Beranda</span>
        </Link>
        <Link to="/add" className="flex flex-col items-center gap-1 hover:text-green-300">
          <Plus className="w-6 h-6" />
          <span className="text-xs">Tambah</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center gap-1 hover:text-green-300">
          <History className="w-6 h-6" />
          <span className="text-xs">Riwayat</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1 hover:text-green-300">
          <User className="w-6 h-6" />
          <span className="text-xs">Profil</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center gap-1 hover:text-green-300">
          <Settings className="w-6 h-6" />
          <span className="text-xs">Pengaturan</span>
        </Link>
      </nav>
      <Footer />
    </div>
  );
};

export default Layout;
