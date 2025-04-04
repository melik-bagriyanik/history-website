'use client';

import { useState, useEffect } from 'react';
import HistoricalFigure from './components/HistoricalFigure';
import Timeline from './components/Timeline';
import { getHistoricalFigures } from './services/historicalService';

interface HistoricalFigure {
  name: string;
  birthYear: number;
  deathYear?: number;
  description: string;
  imageUrl?: string;
}

export default function Home() {
  const [selectedCentury, setSelectedCentury] = useState(17);
  const [figures, setFigures] = useState<HistoricalFigure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFigures = async () => {
      setLoading(true);
      const data = await getHistoricalFigures(selectedCentury);
      setFigures(data);
      setLoading(false);
    };

    loadFigures();
  }, [selectedCentury]);

  // Format century display for the title
  const formatCenturyTitle = (century: number) => {
    if (century < 0) {
      return `${Math.abs(century)}. Yüzyıl MÖ`;
    } else if (century === 0) {
      return "1. Yüzyıl";
    } else {
      return `${century}. Yüzyıl`;
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Tarihsel Zaman Çizelgesi
        </h1>
        
        <Timeline 
          selectedCentury={selectedCentury} 
          onCenturyChange={setSelectedCentury} 
        />

        <h2 className="text-2xl font-semibold text-center mb-8">
          {formatCenturyTitle(selectedCentury)} Önemli İsimleri
        </h2>

        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Yükleniyor...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {figures.map((figure, index) => (
              <HistoricalFigure 
                key={index} 
                figure={{ ...figure, imageUrl: figure.imageUrl || '/default-image.jpg' }} 
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
