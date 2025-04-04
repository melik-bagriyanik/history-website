'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HistoricalFigureProps {
  figure: {
    name: string;
    birthYear: number;
    deathYear?: number;
    description: string;
    imageUrl: string;
  };
}

export default function HistoricalFigure({ figure }: HistoricalFigureProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(figure.imageUrl);

  useEffect(() => {
    // Reset states when figure changes
    setImageError(false);
    setImageLoading(true);
    setImageSrc(figure.imageUrl);
  }, [figure]);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 w-full">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-500">Fotoğraf yok</span>
          </div>
        ) : (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
            <Image
              src={imageSrc}
              alt={figure.name}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{figure.name}</h3>
        <p className="text-gray-600 mb-2">
          {figure.birthYear} - {figure.deathYear || 'Günümüz'}
        </p>
        <p className="text-gray-700">{figure.description}</p>
      </div>
    </div>
  );
} 