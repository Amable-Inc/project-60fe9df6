'use client';

import { useState } from 'react';

interface Verse {
  id: number;
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

const verses: Verse[] = [
  {
    id: 1,
    book: "Juan",
    chapter: 3,
    verse: 16,
    text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
  },
  {
    id: 2,
    book: "Salmos",
    chapter: 23,
    verse: 1,
    text: "Jehová es mi pastor; nada me faltará."
  },
  {
    id: 3,
    book: "Filipenses",
    chapter: 4,
    verse: 13,
    text: "Todo lo puedo en Cristo que me fortalece."
  },
  {
    id: 4,
    book: "Proverbios",
    chapter: 3,
    verse: 5,
    text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia."
  },
  {
    id: 5,
    book: "Romanos",
    chapter: 8,
    verse: 28,
    text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados."
  },
  {
    id: 6,
    book: "Jeremías",
    chapter: 29,
    verse: 11,
    text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis."
  },
  {
    id: 7,
    book: "Mateo",
    chapter: 11,
    verse: 28,
    text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."
  },
  {
    id: 8,
    book: "Isaías",
    chapter: 40,
    verse: 31,
    text: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán."
  },
  {
    id: 9,
    book: "Salmos",
    chapter: 46,
    verse: 1,
    text: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones."
  },
  {
    id: 10,
    book: "Josué",
    chapter: 1,
    verse: 9,
    text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas."
  }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentVerse = verses[currentIndex];

  const getRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    setCurrentIndex(randomIndex);
  };

  const nextVerse = () => {
    setCurrentIndex((prev) => (prev + 1) % verses.length);
  };

  const prevVerse = () => {
    setCurrentIndex((prev) => (prev - 1 + verses.length) % verses.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            📖 Versos Bíblicos
          </h1>
          <p className="text-gray-600 text-lg">
            Versión Reina Valera 1960
          </p>
        </header>

        {/* Verse Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100">
          <div className="text-center mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              {currentVerse.book} {currentVerse.chapter}:{currentVerse.verse}
            </span>
          </div>
          
          <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center italic mb-8">
            "{currentVerse.text}"
          </blockquote>

          <div className="flex items-center justify-center text-sm text-gray-500">
            <span>{currentIndex + 1} de {verses.length}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={prevVerse}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            ← Anterior
          </button>
          
          <button
            onClick={getRandomVerse}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md"
          >
            🎲 Verso Aleatorio
          </button>
          
          <button
            onClick={nextVerse}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Siguiente →
          </button>
        </div>

        {/* Verse List */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Todos los Versos
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {verses.map((verse, index) => (
              <button
                key={verse.id}
                onClick={() => setCurrentIndex(index)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  currentIndex === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-blue-700 mb-2">
                  {verse.book} {verse.chapter}:{verse.verse}
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {verse.text}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
