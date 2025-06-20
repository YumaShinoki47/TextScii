import React, { useState } from 'react';
import { Copy, Download, Edit3, Clock, Palette } from 'lucide-react';
import { ASCIIResponse } from '../types';

interface ASCIIResultProps {
  result: ASCIIResponse;
  onRefine?: (modification: string) => void;
  isRefining?: boolean;
  originalText?: string;
}

const ASCIIResult: React.FC<ASCIIResultProps> = ({ 
  result, 
  onRefine, 
  isRefining = false,
  originalText = '' 
}) => {
  const [showRefineForm, setShowRefineForm] = useState(false);
  const [refinement, setRefinement] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.ascii_art);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result.ascii_art], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascii-art-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRefine = () => {
    if (refinement.trim() && onRefine) {
      onRefine(refinement.trim());
      setRefinement('');
      setShowRefineForm(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Palette className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">生成結果</h3>
          </div>
          <div className="flex items-center space-x-2">
            {result.generation_time && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{result.generation_time.toFixed(2)}秒</span>
              </div>
            )}
            <div className="text-sm text-gray-500">
              {result.style} | {result.width}×{result.height}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="ascii-output text-green-400">
            {result.ascii_art}
          </pre>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={handleCopy}
            className="btn-secondary flex items-center space-x-2"
          >
            <Copy className="h-4 w-4" />
            <span>{copied ? 'コピー済み!' : 'コピー'}</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>ダウンロード</span>
          </button>
          
          {onRefine && (
            <button
              onClick={() => setShowRefineForm(!showRefineForm)}
              className="btn-secondary flex items-center space-x-2"
              disabled={isRefining}
            >
              <Edit3 className="h-4 w-4" />
              <span>修正</span>
            </button>
          )}
        </div>
      </div>

      {showRefineForm && onRefine && (
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-3">アスキーアート修正</h4>
          <div className="space-y-3">
            <textarea
              value={refinement}
              onChange={(e) => setRefinement(e.target.value)}
              placeholder="例: もっと幻想的に、リアルに、シンプルに..."
              className="input-field h-20 resize-y"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleRefine}
                disabled={!refinement.trim() || isRefining}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isRefining ? '修正中...' : '修正実行'}</span>
              </button>
              <button
                onClick={() => {
                  setShowRefineForm(false);
                  setRefinement('');
                }}
                className="btn-secondary"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ASCIIResult;