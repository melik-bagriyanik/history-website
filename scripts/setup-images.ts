import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function setupImages() {
  try {
    console.log('Creating placeholder image...');
    await execAsync('ts-node scripts/create-placeholder.ts');
    
    console.log('Downloading historical figures\' images...');
    await execAsync('ts-node scripts/download-images.ts');
    
    console.log('Image setup completed successfully!');
  } catch (error) {
    console.error('Error during image setup:', error);
    process.exit(1);
  }
}

setupImages(); 