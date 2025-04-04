import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'historical-figures');

// Create the images directory if it doesn't exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Create a placeholder image
const canvas = createCanvas(800, 800);
const ctx = canvas.getContext('2d');

// Fill background
ctx.fillStyle = '#f0f0f0';
ctx.fillRect(0, 0, 800, 800);

// Draw a simple icon
ctx.fillStyle = '#666666';
ctx.beginPath();
ctx.arc(400, 300, 100, 0, Math.PI * 2);
ctx.fill();

// Draw text
ctx.fillStyle = '#333333';
ctx.font = 'bold 48px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('No Image', 400, 500);
ctx.font = '24px Arial';
ctx.fillText('Available', 400, 550);

// Save the image
const buffer = canvas.toBuffer('image/jpeg');
fs.writeFileSync(path.join(IMAGES_DIR, 'placeholder.jpg'), buffer);

console.log('Placeholder image created successfully!'); 