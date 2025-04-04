interface WikiResponse {
  query: {
    pages: {
      [key: string]: {
        title: string;
        extract: string;
        images?: Array<{
          title: string;
          url: string;
        }>;
      };
    };
  };
}

interface ImageResponse {
  query: {
    pages: {
      [key: string]: {
        title: string;
        imageinfo?: Array<{
          url: string;
        }>;
      };
    };
  };
}

interface ThumbnailResponse {
  query: {
    pages: {
      [key: string]: {
        title: string;
        thumbnail?: {
          source: string;
        };
      };
    };
  };
}

interface ImagesResponse {
  query: {
    pages: {
      [key: string]: {
        title: string;
        images?: Array<{
          title: string;
        }>;
      };
    };
  };
}

interface SearchResponse {
  query: {
    search: Array<{
      title: string;
      pageid: number;
    }>;
  };
}

interface SearchImageResponse {
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

interface NotablePerson {
  name: string;
  birthYear: number;
  deathYear?: number;
  wikiTitle: string;
  imageFileName: string; // Local image file name
}

interface HistoricalFigure {
  name: string;
  birthYear: number;
  deathYear?: number;
  description: string;
  imageUrl: string;
}

export const notablePeopleByCentury: Record<string, NotablePerson[]> = {
  // BCE Centuries
  "-30": [
    { name: "Hammurabi", birthYear: 1810, deathYear: 1750, wikiTitle: "Hammurabi", imageFileName: "hammurabi.jpg" },
    { name: "Tutankhamun", birthYear: 1341, deathYear: 1323, wikiTitle: "Tutankhamun", imageFileName: "tutankhamun.jpg" },
    { name: "Ramesses II", birthYear: 1303, deathYear: 1213, wikiTitle: "Ramesses_II", imageFileName: "ramesses_ii.jpg" }
  ],
  "-25": [
    { name: "Socrates", birthYear: 470, deathYear: 399, wikiTitle: "Socrates", imageFileName: "socrates.jpg" },
    { name: "Plato", birthYear: 428, deathYear: 348, wikiTitle: "Plato", imageFileName: "plato.jpg" },
    { name: "Aristotle", birthYear: 384, deathYear: 322, wikiTitle: "Aristotle", imageFileName: "aristotle.jpg" }
  ],
  "-20": [
    { name: "Alexander the Great", birthYear: 356, deathYear: 323, wikiTitle: "Alexander_the_Great", imageFileName: "alexander_the_great.jpg" },
    { name: "Euclid", birthYear: 325, deathYear: 265, wikiTitle: "Euclid", imageFileName: "euclid.jpg" },
    { name: "Archimedes", birthYear: 287, deathYear: 212, wikiTitle: "Archimedes", imageFileName: "archimedes.jpg" }
  ],
  "-15": [
    { name: "Julius Caesar", birthYear: 100, deathYear: 44, wikiTitle: "Julius_Caesar", imageFileName: "julius_caesar.jpg" },
    { name: "Cicero", birthYear: 106, deathYear: 43, wikiTitle: "Cicero", imageFileName: "cicero.jpg" },
    { name: "Cleopatra", birthYear: 69, deathYear: 30, wikiTitle: "Cleopatra", imageFileName: "cleopatra.jpg" }
  ],
  "-10": [
    { name: "Virgil", birthYear: 70, deathYear: 19, wikiTitle: "Virgil", imageFileName: "virgil.jpg" },
    { name: "Horace", birthYear: 65, deathYear: 8, wikiTitle: "Horace", imageFileName: "horace.jpg" },
    { name: "Ovid", birthYear: 43, deathYear: 17, wikiTitle: "Ovid", imageFileName: "ovid.jpg" }
  ],
  "-5": [
    { name: "Jesus Christ", birthYear: 4, deathYear: 33, wikiTitle: "Jesus", imageFileName: "jesus_christ.jpg" },
    { name: "Augustus", birthYear: 63, deathYear: 14, wikiTitle: "Augustus", imageFileName: "augustus.jpg" },
    { name: "Pliny the Elder", birthYear: 23, deathYear: 79, wikiTitle: "Pliny_the_Elder", imageFileName: "pliny_the_elder.jpg" }
  ],
  // CE Centuries
  1: [
    { name: "Jesus Christ", birthYear: 4, deathYear: 33, wikiTitle: "Jesus", imageFileName: "jesus_christ.jpg" },
    { name: "Augustus", birthYear: 63, deathYear: 14, wikiTitle: "Augustus", imageFileName: "augustus.jpg" },
    { name: "Pliny the Elder", birthYear: 23, deathYear: 79, wikiTitle: "Pliny_the_Elder", imageFileName: "pliny_the_elder.jpg" }
  ],
  2: [
    { name: "Marcus Aurelius", birthYear: 121, deathYear: 180, wikiTitle: "Marcus_Aurelius", imageFileName: "marcus_aurelius.jpg" },
    { name: "Claudius Ptolemy", birthYear: 100, deathYear: 170, wikiTitle: "Ptolemy", imageFileName: "claudius_ptolemy.jpg" },
    { name: "Galen", birthYear: 129, deathYear: 216, wikiTitle: "Galen", imageFileName: "galen.jpg" }
  ],
  3: [
    { name: "Diocletian", birthYear: 244, deathYear: 311, wikiTitle: "Diocletian", imageFileName: "diocletian.jpg" },
    { name: "Constantine the Great", birthYear: 272, deathYear: 337, wikiTitle: "Constantine_the_Great", imageFileName: "constantine_the_great.jpg" },
    { name: "Plotinus", birthYear: 204, deathYear: 270, wikiTitle: "Plotinus", imageFileName: "plotinus.jpg" }
  ],
  4: [
    { name: "Saint Augustine", birthYear: 354, deathYear: 430, wikiTitle: "Augustine_of_Hippo", imageFileName: "saint_augustine.jpg" },
    { name: "Ambrose", birthYear: 340, deathYear: 397, wikiTitle: "Ambrose", imageFileName: "ambrose.jpg" },
    { name: "Theodosius I", birthYear: 347, deathYear: 395, wikiTitle: "Theodosius_I", imageFileName: "theodosius_i.jpg" }
  ],
  5: [
    { name: "Attila", birthYear: 406, deathYear: 453, wikiTitle: "Attila", imageFileName: "attila.jpg" },
    { name: "Theodoric the Great", birthYear: 454, deathYear: 526, wikiTitle: "Theodoric_the_Great", imageFileName: "theodoric_the_great.jpg" },
    { name: "Boethius", birthYear: 480, deathYear: 524, wikiTitle: "Boethius", imageFileName: "boethius.jpg" }
  ],
  6: [
    { name: "Gregory the Great", birthYear: 540, deathYear: 604, wikiTitle: "Pope_Gregory_I", imageFileName: "gregory_the_great.jpg" },
    { name: "Muhammad", birthYear: 570, deathYear: 632, wikiTitle: "Muhammad", imageFileName: "muhammad.jpg" },
    { name: "Justinian I", birthYear: 482, deathYear: 565, wikiTitle: "Justinian_I", imageFileName: "justinian_i.jpg" }
  ],
  7: [
    { name: "Bede", birthYear: 672, deathYear: 735, wikiTitle: "Bede", imageFileName: "bede.jpg" },
    { name: "Charles Martel", birthYear: 688, deathYear: 741, wikiTitle: "Charles_Martel", imageFileName: "charles_martel.jpg" },
    { name: "Umar ibn Al-Khattab", birthYear: 584, deathYear: 644, wikiTitle: "Umar", imageFileName: "umar_ibn_al_khattab.jpg" }
  ],
  8: [
    { name: "Charlemagne", birthYear: 742, deathYear: 814, wikiTitle: "Charlemagne", imageFileName: "charlemagne.jpg" },
    { name: "Alcuin", birthYear: 735, deathYear: 804, wikiTitle: "Alcuin", imageFileName: "alcuin.jpg" },
    { name: "Harun al-Rashid", birthYear: 763, deathYear: 809, wikiTitle: "Harun_al-Rashid", imageFileName: "harun_al_rashid.jpg" }
  ],
  9: [
    { name: "Alfred the Great", birthYear: 849, deathYear: 899, wikiTitle: "Alfred_the_Great", imageFileName: "alfred_the_great.jpg" },
    { name: "Al-Khwarizmi", birthYear: 780, deathYear: 850, wikiTitle: "Al-Khwarizmi", imageFileName: "al_khwarizmi.jpg" },
    { name: "Rurik", birthYear: 830, deathYear: 879, wikiTitle: "Rurik", imageFileName: "rurik.jpg" }
  ],
  10: [
    { name: "Otto the Great", birthYear: 912, deathYear: 973, wikiTitle: "Otto_the_Great", imageFileName: "otto_the_great.jpg" },
    { name: "Al-Haytham", birthYear: 965, deathYear: 1040, wikiTitle: "Al-Haytham", imageFileName: "al_haytham.jpg" },
    { name: "Hugh Capet", birthYear: 941, deathYear: 996, wikiTitle: "Hugh_Capet", imageFileName: "hugh_capet.jpg" }
  ],
  11: [
    { name: "William the Conqueror", birthYear: 1028, deathYear: 1087, wikiTitle: "William_the_Conqueror", imageFileName: "william_the_conqueror.jpg" },
    { name: "Hildegard of Bingen", birthYear: 1098, deathYear: 1179, wikiTitle: "Hildegard_of_Bingen", imageFileName: "hildegard_of_bingen.jpg" },
    { name: "Avicenna", birthYear: 980, deathYear: 1037, wikiTitle: "Avicenna", imageFileName: "avicenna.jpg" }
  ],
  12: [
    { name: "Thomas Aquinas", birthYear: 1225, deathYear: 1274, wikiTitle: "Thomas_Aquinas", imageFileName: "thomas_aquinas.jpg" },
    { name: "Saladin", birthYear: 1137, deathYear: 1193, wikiTitle: "Saladin", imageFileName: "saladin.jpg" },
    { name: "Richard the Lionheart", birthYear: 1157, deathYear: 1199, wikiTitle: "Richard_the_Lionheart", imageFileName: "richard_the_lionheart.jpg" }
  ],
  13: [
    { name: "Marco Polo", birthYear: 1254, deathYear: 1324, wikiTitle: "Marco_Polo", imageFileName: "marco_polo.jpg" },
    { name: "Dante Alighieri", birthYear: 1265, deathYear: 1321, wikiTitle: "Dante_Alighieri", imageFileName: "dante_alighieri.jpg" },
    { name: "Giotto", birthYear: 1267, deathYear: 1337, wikiTitle: "Giotto", imageFileName: "giotto.jpg" }
  ],
  14: [
    { name: "Geoffrey Chaucer", birthYear: 1343, deathYear: 1400, wikiTitle: "Geoffrey_Chaucer", imageFileName: "geoffrey_chaucer.jpg" },
    { name: "Ibn Khaldun", birthYear: 1332, deathYear: 1406, wikiTitle: "Ibn_Khaldun", imageFileName: "ibn_khaldun.jpg" },
    { name: "Jan Hus", birthYear: 1372, deathYear: 1415, wikiTitle: "Jan_Hus", imageFileName: "jan_hus.jpg" }
  ],
  15: [
    { name: "Leonardo da Vinci", birthYear: 1452, deathYear: 1519, wikiTitle: "Leonardo_da_Vinci", imageFileName: "leonardo_da_vinci.jpg" },
    { name: "Christopher Columbus", birthYear: 1451, deathYear: 1506, wikiTitle: "Christopher_Columbus", imageFileName: "christopher_columbus.jpg" },
    { name: "Martin Luther", birthYear: 1483, deathYear: 1546, wikiTitle: "Martin_Luther", imageFileName: "martin_luther.jpg" }
  ],
  16: [
    { name: "William Shakespeare", birthYear: 1564, deathYear: 1616, wikiTitle: "William_Shakespeare", imageFileName: "william_shakespeare.jpg" },
    { name: "Galileo Galilei", birthYear: 1564, deathYear: 1642, wikiTitle: "Galileo_Galilei", imageFileName: "galileo_galilei.jpg" },
    { name: "René Descartes", birthYear: 1596, deathYear: 1650, wikiTitle: "René_Descartes", imageFileName: "rene_descartes.jpg" }
  ],
  17: [
    { name: "Isaac Newton", birthYear: 1643, deathYear: 1727, wikiTitle: "Isaac_Newton", imageFileName: "isaac_newton.jpg" },
    { name: "John Locke", birthYear: 1632, deathYear: 1704, wikiTitle: "John_Locke", imageFileName: "john_locke.jpg" },
    { name: "Louis XIV", birthYear: 1638, deathYear: 1715, wikiTitle: "Louis_XIV", imageFileName: "louis_xiv.jpg" }
  ],
  18: [
    { name: "Voltaire", birthYear: 1694, deathYear: 1778, wikiTitle: "Voltaire", imageFileName: "voltaire.jpg" },
    { name: "Benjamin Franklin", birthYear: 1706, deathYear: 1790, wikiTitle: "Benjamin_Franklin", imageFileName: "benjamin_franklin.jpg" },
    { name: "Catherine the Great", birthYear: 1729, deathYear: 1796, wikiTitle: "Catherine_the_Great", imageFileName: "catherine_the_great.jpg" }
  ],
  19: [
    { name: "Charles Darwin", birthYear: 1809, deathYear: 1882, wikiTitle: "Charles_Darwin", imageFileName: "charles_darwin.jpg" },
    { name: "Karl Marx", birthYear: 1818, deathYear: 1883, wikiTitle: "Karl_Marx", imageFileName: "karl_marx.jpg" },
    { name: "Queen Victoria", birthYear: 1819, deathYear: 1901, wikiTitle: "Queen_Victoria", imageFileName: "queen_victoria.jpg" }
  ],
  20: [
    { name: "Albert Einstein", birthYear: 1879, deathYear: 1955, wikiTitle: "Albert_Einstein", imageFileName: "albert_einstein.jpg" },
    { name: "Winston Churchill", birthYear: 1874, deathYear: 1965, wikiTitle: "Winston_Churchill", imageFileName: "winston_churchill.jpg" },
    { name: "Mahatma Gandhi", birthYear: 1869, deathYear: 1948, wikiTitle: "Mahatma_Gandhi", imageFileName: "mahatma_gandhi.jpg" }
  ],
  21: [
    { name: "Barack Obama", birthYear: 1961, wikiTitle: "Barack_Obama", imageFileName: "barack_obama.jpg" },
    { name: "Elon Musk", birthYear: 1971, wikiTitle: "Elon_Musk", imageFileName: "elon_musk.jpg" },
    { name: "Malala Yousafzai", birthYear: 1997, wikiTitle: "Malala_Yousafzai", imageFileName: "malala_yousafzai.jpg" }
  ]
};

export async function getHistoricalFigures(century: number): Promise<HistoricalFigure[]> {
  const notablePeople = notablePeopleByCentury[century.toString()] || [];
  
  const figures = await Promise.all(
    notablePeople.map(async (person) => {
      try {
        // Get the page content from Wikipedia
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${person.wikiTitle}&prop=extracts&exintro=1&explaintext=1&format=json&origin=*`
        );
        const data: WikiResponse = await response.json();
        const page = Object.values(data.query.pages)[0];
        
        // Use local image path
        const imageUrl = `/images/historical-figures/${person.imageFileName}`;
        
        return {
          name: person.name,
          birthYear: person.birthYear,
          deathYear: person.deathYear,
          description: page.extract.split('.')[0] + '.',
          imageUrl: imageUrl
        };
      } catch (error) {
        console.error(`Error fetching data for ${person.name}:`, error);
        return {
          name: person.name,
          birthYear: person.birthYear,
          deathYear: person.deathYear,
          description: 'Bilgi yüklenirken bir hata oluştu.',
          imageUrl: `/images/historical-figures/placeholder.jpg`
        };
      }
    })
  );

  return figures;
}

// Function to get a fallback image URL based on the person's name
function getFallbackImageUrl(name: string): string {
  // Use a placeholder image service that generates actual portraits
  return `/images/historical-figures/placeholder.jpg`;
} 