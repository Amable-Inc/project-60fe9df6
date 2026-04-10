'use client';

import { useState } from 'react';

interface VerseData {
  reference: string;
  text: string;
  translation_id: string;
  translation_name: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchVerse = async (query: string) => {
    if (!query.trim()) {
      setError('Por favor ingresa una referencia bíblica');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=kjv`);
      
      if (!response.ok) {
        throw new Error('Verso no encontrado');
      }

      const data = await response.json();
      setVerse({
        reference: data.reference,
        text: data.text.trim(),
        translation_id: data.translation_id,
        translation_name: data.translation_name
      });
    } catch (err) {
      setError('No se pudo encontrar el verso. Intenta con otro formato (ej: John 3:16, Psalms 23:1-6)');
      setVerse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchVerse(searchQuery);
  };

  const quickSearch = (query: string) => {
    setSearchQuery(query);
    searchVerse(query);
  };

  const popularVerses = [
    'John 3:16',
    'Psalms 23:1',
    'Philippians 4:13',
    'Proverbs 3:5-6',
    'Romans 8:28',
    'Jeremiah 29:11',
    'Matthew 11:28',
    'Isaiah 40:31',
    'Psalms 46:1',
    'Joshua 1:9'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            📖 Bible Verse Search
          </h1>
          <p className="text-gray-600 text-lg">
            King James Version (KJV)
          </p>
        </header>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar verso (ej: John 3:16, Psalms 23:1-6)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Buscando...' : '🔍 Buscar'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {verse && (
            <div className="border-t pt-6">
              <div className="text-center mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {verse.reference}
                </span>
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {verse.text}
              </blockquote>

              <div className="text-center text-sm text-gray-500">
                {verse.translation_name}
              </div>
            </div>
          )}

          {!verse && !loading && !error && (
            <div className="text-center text-gray-500 py-8">
              Busca cualquier verso de la Biblia usando el formato: Libro Capítulo:Versículo
              <br />
              <span className="text-sm">(Ejemplo: John 3:16 o Psalms 23:1-6)</span>
            </div>
          )}
        </div>

        {/* Popular Verses */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Versos Populares
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {popularVerses.map((verseRef) => (
              <button
                key={verseRef}
                onClick={() => quickSearch(verseRef)}
                className="p-4 bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-lg transition-all text-center font-medium text-gray-700"
              >
                {verseRef}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3">Cómo usar:</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Un solo verso:</strong> John 3:16</li>
            <li>• <strong>Rango de versos:</strong> Psalms 23:1-6</li>
            <li>• <strong>Capítulo completo:</strong> Genesis 1</li>
            <li>• También puedes usar abreviaciones: Jn 3:16, Ps 23:1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
