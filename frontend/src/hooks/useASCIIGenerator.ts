import { useState, useCallback } from 'react';
import { asciiAPI } from '../services/api';
import { ASCIIRequest, ASCIIResponse, RefineRequest, GenerationSettings } from '../types';

interface UseASCIIGeneratorReturn {
  isLoading: boolean;
  error: string | null;
  result: ASCIIResponse | null;
  generateASCII: (text: string, settings: GenerationSettings) => Promise<void>;
  refineASCII: (originalText: string, modification: string, currentASCII: string) => Promise<void>;
  clear: () => void;
}

export const useASCIIGenerator = (): UseASCIIGeneratorReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ASCIIResponse | null>(null);

  const generateASCII = useCallback(async (text: string, settings: GenerationSettings) => {
    if (!text.trim()) {
      setError('テキストを入力してください');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: ASCIIRequest = {
        text: text.trim(),
        style: settings.style,
        width: settings.width,
        height: settings.height,
        charset: settings.charset,
        density: settings.density,
        language: 'ja'
      };

      const response = await asciiAPI.generateASCII(request);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refineASCII = useCallback(async (originalText: string, modification: string, currentASCII: string) => {
    if (!modification.trim()) {
      setError('修正指示を入力してください');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: RefineRequest = {
        original_text: originalText,
        modification: modification.trim(),
        current_ascii: currentASCII
      };

      const response = await asciiAPI.refineASCII(request);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    result,
    generateASCII,
    refineASCII,
    clear
  };
};