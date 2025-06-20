import React from 'react';
import { Palette } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TextScii</h1>
              <p className="text-sm text-gray-500">AI ASCII Art Generator</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">テキストからアスキーアートを生成</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;