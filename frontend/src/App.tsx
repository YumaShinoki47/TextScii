import React, { useState } from 'react';
import Header from './components/Header';
import GenerationForm from './components/GenerationForm';
import ASCIIResult from './components/ASCIIResult';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useASCIIGenerator } from './hooks/useASCIIGenerator';
import { GenerationSettings } from './types';

function App() {
  const { isLoading, error, result, generateASCII, refineASCII, clear } = useASCIIGenerator();
  const [currentText, setCurrentText] = useState('');

  const handleGenerate = async (text: string, settings: GenerationSettings) => {
    setCurrentText(text);
    await generateASCII(text, settings);
  };

  const handleRefine = async (modification: string) => {
    if (result && currentText) {
      await refineASCII(currentText, modification, result.ascii_art);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <GenerationForm 
              onGenerate={handleGenerate} 
              isLoading={isLoading} 
            />
            
            {error && (
              <ErrorMessage 
                message={error} 
                onClose={clear} 
              />
            )}
          </div>
          
          <div className="space-y-6">
            {isLoading && <LoadingSpinner />}
            
            {result && !isLoading && (
              <ASCIIResult
                result={result}
                onRefine={handleRefine}
                isRefining={isLoading}
                originalText={currentText}
              />
            )}
            
            {!result && !isLoading && !error && (
              <div className="card">
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    アスキーアートを生成
                  </h3>
                  <p className="text-gray-500">
                    左のフォームにテキストを入力して、AIがアスキーアートを生成します
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <footer className="mt-16 border-t border-gray-200 pt-8">
          <div className="text-center text-sm text-gray-500">
            <p>TextScii - AI-powered ASCII Art Generator</p>
            <p className="mt-1">テキストからアスキーアートを生成するWebサービス</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;