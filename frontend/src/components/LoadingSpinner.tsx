import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = '生成中...' }) => {
  return (
    <div className="card">
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-sm text-gray-600">{message}</p>
        <p className="text-xs text-gray-500 mt-2">
          AIがアスキーアートを生成しています...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;