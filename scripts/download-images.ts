import fs from 'fs';
import path from 'path';
import https from 'https';
import { notablePeopleByCentury } from '../app/services/historicalService';

// Constants
const MIN_IMAGE_SIZE = 10000; // Minimum image size in bytes

interface WikiSearchResponse {
  query: {
    search: Array<{
      pageid: number;
      title: string;
    }>;
  };
}

interface WikiImagesResponse {
  query: {
    pages: {
      [key: string]: {
        images?: Array<{
          title: string;
        }>;
      };
    };
  };
}

interface WikiImageInfoResponse {
  query: {
    pages: {
      [key: string]: {
        imageinfo?: Array<{
          url: string;
        }>;
      };
    };
  };
}

interface WikiThumbnailResponse {
  query: {
    pages: {
      [key: string]: {
        thumbnail?: {
          source: string;
        };
      };
    };
  };
}

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'historical-figures');

// Create the images directory if it doesn't exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Function to download an image with retries
async function downloadImage(url: string, filePath: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.promises.writeFile(filePath, buffer);
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error);
    throw error;
  }
}

// Function to download specific images for figures that are hard to find
async function downloadSpecificImage(name: string, filePath: string): Promise<boolean> {
  const specificImages: Record<string, string> = {
    'louis xiv': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Louis_XIV_of_France.jpg',
    'socrates': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Socrates_Louvre.jpg'
  };

  const key = Object.keys(specificImages).find(k => name.toLowerCase().includes(k));
  if (key) {
    try {
      await downloadImage(specificImages[key], filePath);
      return true;
    } catch (error) {
      console.error(`Error downloading specific image for ${name}:`, error);
      return false;
    }
  }
  return false;
}

// Function to get image URL from Wikipedia with better error handling
async function getWikipediaImageUrl(name: string): Promise<string | null> {
  // Try specific images first
  const filePath = path.join(process.cwd(), 'public', 'images', 'historical-figures', `${name.toLowerCase().replace(/ /g, '_')}.jpg`);
  if (await downloadSpecificImage(name, filePath)) {
    return null; // Return null since we've already downloaded the image
  }

  const searchQueries = [
    `${name} portrait`,
    `${name} painting`,
    `${name} statue`,
    `${name} bust`,
    `${name} historical`,
    `${name} artwork`,
    // Add specific queries for remaining figures
    ...(name.toLowerCase().includes('aristotle') ? [
      'Aristotle Louvre',
      'Aristotle Roman copy',
      'Aristotle bust Vienna',
      'Aristotle Lysippos',
      'Aristotle ancient bust',
      'Aristotle marble portrait',
      'File:Aristotle Altemps Inv8575.jpg'
    ] : []),
    ...(name.toLowerCase().includes('galen') ? [
      'Galen of Pergamon',
      'Galen ancient bust',
      'Galen physician portrait',
      'Galen marble bust',
      'Galen Greek physician',
      'File:Galenus.jpg'
    ] : []),
    ...(name.toLowerCase().includes('louis xiv') ? [
      'File:Louis XIV of France.jpg',
      'File:Portrait of Louis XIV of France.jpg',
      'File:Louis XIV of France by Hyacinthe Rigaud (1701).jpg',
      'File:Louis XIV 1701.jpg',
      'File:Louis XIV Versailles.jpg',
      'Louis XIV portrait by Hyacinthe Rigaud',
      'Louis XIV of France official portrait',
      'Louis XIV state portrait Rigaud',
      'Louis XIV Versailles portrait',
      'Louis XIV Sun King portrait',
      'Louis XIV coronation portrait'
    ] : []),
    ...(name.toLowerCase().includes('socrates') ? [
      'File:Socrates Louvre.jpg',
      'File:Socrates BM 1973.jpg',
      'File:Socrates Glyptothek.jpg',
      'File:Head Socrates Glyptothek Munich.jpg',
      'File:Socrates Pio-Clementino.jpg',
      'Socrates bust Louvre Museum',
      'Socrates marble portrait',
      'Socrates ancient Greek bust',
      'Socrates classical portrait',
      'Socrates philosopher bust',
      'Socrates Roman copy'
    ] : [])
  ];

  // Try direct file access first
  for (const query of searchQueries) {
    if (query.startsWith('File:')) {
      try {
        const fileTitle = query;
        const imageInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url`;
        const imageInfoResponse = await fetch(imageInfoUrl);
        const imageInfoData = await imageInfoResponse.json() as WikiImageInfoResponse;

        const imagePages = Object.values(imageInfoData.query?.pages || {});
        if (imagePages[0]?.imageinfo?.[0]?.url) {
          const imageUrl = imagePages[0].imageinfo[0].url;
          
          // Verify the image size
          const response = await fetch(imageUrl);
          const contentLength = parseInt(response.headers.get('content-length') || '0');
          if (contentLength >= MIN_IMAGE_SIZE) {
            return imageUrl;
          }
        }
      } catch (error) {
        console.error(`Error fetching specific file "${query}":`, error);
        continue;
      }
    }
  }

  // Try Commons search API with specific namespace and sorting
  for (const query of searchQueries) {
    if (!query.startsWith('File:')) {
      try {
        const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srsort=relevance&srlimit=10&srsearch=${encodeURIComponent(query)}`;
        const commonsResponse = await fetch(commonsUrl);
        const commonsData = await commonsResponse.json() as WikiSearchResponse;

        if (commonsData.query?.search) {
          for (const result of commonsData.query.search.slice(0, 3)) {
            const title = result.title;
            const imageInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url`;
            const imageInfoResponse = await fetch(imageInfoUrl);
            const imageInfoData = await imageInfoResponse.json() as WikiImageInfoResponse;

            const imagePages = Object.values(imageInfoData.query?.pages || {});
            if (imagePages[0]?.imageinfo?.[0]?.url) {
              const imageUrl = imagePages[0].imageinfo[0].url;
              
              // Verify the image size
              const response = await fetch(imageUrl);
              const contentLength = parseInt(response.headers.get('content-length') || '0');
              if (contentLength >= MIN_IMAGE_SIZE) {
                return imageUrl;
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching from Commons for "${query}":`, error);
        continue;
      }
    }
  }

  // Try Wikipedia API as fallback
  for (const query of searchQueries) {
    if (!query.startsWith('File:')) {
      try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json() as WikiSearchResponse;

        if (!searchData.query?.search?.[0]) continue;

        const title = searchData.query.search[0].title;
        const imagesUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(title)}&prop=images`;
        const imagesResponse = await fetch(imagesUrl);
        const imagesData = await imagesResponse.json() as WikiImagesResponse;

        const pages = Object.values(imagesData.query?.pages || {});
        if (!pages[0]?.images?.length) continue;

        for (const image of pages[0].images.slice(0, 3)) {
          const imageTitle = image.title;
          const imageInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(imageTitle)}&prop=imageinfo&iiprop=url`;
          const imageInfoResponse = await fetch(imageInfoUrl);
          const imageInfoData = await imageInfoResponse.json() as WikiImageInfoResponse;

          const imagePages = Object.values(imageInfoData.query?.pages || {});
          if (!imagePages[0]?.imageinfo?.[0]?.url) continue;

          const imageUrl = imagePages[0].imageinfo[0].url;
          
          // Verify the image size before returning
          const response = await fetch(imageUrl);
          const contentLength = parseInt(response.headers.get('content-length') || '0');
          if (contentLength >= MIN_IMAGE_SIZE) {
            return imageUrl;
          }
        }
      } catch (error) {
        console.error(`Error fetching image for query "${query}":`, error);
        continue;
      }
    }
  }

  return null;
}

// Main function to download all images
async function downloadAllImages() {
  const processedPeople = new Set<string>();
  const MIN_IMAGE_SIZE = 10000; // Minimum acceptable image size in bytes
  
  for (const [century, people] of Object.entries(notablePeopleByCentury)) {
    console.log(`Processing century ${century}...`);
    
    for (const person of people) {
      // Skip if we've already processed this person (some appear in multiple centuries)
      if (processedPeople.has(person.name)) {
        continue;
      }
      processedPeople.add(person.name);
      
      console.log(`Processing ${person.name}...`);
      const filePath = path.join(IMAGES_DIR, person.imageFileName);
      
      // Check if the file exists and is large enough
      const needsDownload = !fs.existsSync(filePath) || 
                          fs.statSync(filePath).size < MIN_IMAGE_SIZE;
      
      if (needsDownload) {
        try {
          const imageUrl = await getWikipediaImageUrl(person.name);
          
          if (imageUrl) {
            await downloadImage(imageUrl, filePath);
            
            // Verify the downloaded image size
            if (fs.statSync(filePath).size < MIN_IMAGE_SIZE) {
              console.log(`Downloaded image for ${person.name} is too small, trying alternative sources...`);
              // Try alternative image sources or queries
              const alternativeQueries = [
                `${person.name} historical`,
                `${person.name} famous`,
                `${person.name} vintage`,
                `${person.name} old`,
                `${person.wikiTitle} historical`
              ];
              
              let found = false;
              for (const query of alternativeQueries) {
                if (!found) {
                  const altImageUrl = await getWikipediaImageUrl(query);
                  if (altImageUrl) {
                    await downloadImage(altImageUrl, filePath);
                    if (fs.statSync(filePath).size >= MIN_IMAGE_SIZE) {
                      found = true;
                      console.log(`Successfully found better image for ${person.name}`);
                    }
                  }
                }
              }
              
              if (!found) {
                console.log(`Could not find suitable image for ${person.name}`);
              }
            } else {
              console.log(`Successfully downloaded image for ${person.name}`);
            }
          } else {
            console.log(`No image found for ${person.name}`);
          }
        } catch (error) {
          console.error(`Error downloading image for ${person.name}:`, error);
        }
      } else {
        console.log(`Image for ${person.name} already exists and is large enough, skipping...`);
      }
    }
  }
}

// Run the script
downloadAllImages().catch(console.error); 