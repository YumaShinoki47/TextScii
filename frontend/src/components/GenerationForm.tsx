import React, { useState } from 'react';
import { Wand2, Settings } from 'lucide-react';
import { ASCIIStyle, CharsetType, GenerationSettings } from '../types';

interface GenerationFormProps {
  onGenerate: (text: string, settings: GenerationSettings) => void;
  isLoading: boolean;
}

const GenerationForm: React.FC<GenerationFormProps> = ({ onGenerate, isLoading }) => {
  const [text, setText] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [settings, setSettings] = useState<GenerationSettings>({
    style: ASCIIStyle.CLASSIC,
    width: 80,
    height: 40,
    charset: CharsetType.STANDARD,
    density: 1.0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onGenerate(text, settings);
    }
  };

  const styleLabels = {
    [ASCIIStyle.CLASSIC]: 'クラシック',
    [ASCIIStyle.MODERN]: 'モダン',
    [ASCIIStyle.MINIMAL]: 'ミニマル',
    [ASCIIStyle.ARTISTIC]: 'アーティスティック'
  };

  const charsetLabels = {
    [CharsetType.STANDARD]: '標準',
    [CharsetType.EXTENDED]: '拡張',
    [CharsetType.MINIMAL]: 'ミニマル',
    [CharsetType.CUSTOM]: 'カスタム'
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
            テキスト説明
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="例: 猫が寝ている、桜の木、山の風景..."
            className="input-field h-24 resize-y"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            生成したいアスキーアートの内容を日本語で説明してください
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
              スタイル
            </label>
            <select
              id="style"
              value={settings.style}
              onChange={(e) => setSettings(prev => ({ ...prev, style: e.target.value as ASCIIStyle }))}
              className="input-field"
            >
              {Object.entries(styleLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>詳細設定</span>
            </button>
          </div>
        </div>

        {showAdvanced && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-2">
                  幅
                </label>
                <input
                  type="number"
                  id="width"
                  value={settings.width}
                  onChange={(e) => setSettings(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                  min="20"
                  max="200"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                  高さ
                </label>
                <input
                  type="number"
                  id="height"
                  value={settings.height}
                  onChange={(e) => setSettings(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                  min="10"
                  max="100"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="density" className="block text-sm font-medium text-gray-700 mb-2">
                  密度
                </label>
                <input
                  type="number"
                  id="density"
                  value={settings.density}
                  onChange={(e) => setSettings(prev => ({ ...prev, density: parseFloat(e.target.value) }))}
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label htmlFor="charset" className="block text-sm font-medium text-gray-700 mb-2">
                文字セット
              </label>
              <select
                id="charset"
                value={settings.charset}
                onChange={(e) => setSettings(prev => ({ ...prev, charset: e.target.value as CharsetType }))}
                className="input-field"
              >
                {Object.entries(charsetLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 className="h-5 w-5" />
          <span>{isLoading ? '生成中...' : 'アスキーアート生成'}</span>
        </button>
      </form>
    </div>
  );
};

export default GenerationForm;