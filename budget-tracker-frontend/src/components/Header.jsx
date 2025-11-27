import React from 'react';
import { Terminal } from 'lucide-react';

const Header = () => {
  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="border-2 border-border-color p-4 bg-bg-color">
        <div className="flex items-center gap-3 mb-2">
          {/* <Terminal className="w-6 h-6" /> */}
          <h1 className="text-2xl font-bold">BUDGET_TRACKER</h1>
        </div>
        <div className="text-xs opacity-70">v1.0.0 | System Active | {new Date().toLocaleString('id-ID')}</div>
      </div>
    </div>
  );
};

export default Header;
