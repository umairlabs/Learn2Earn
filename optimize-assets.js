/**
 * Learn2Earn Asset Optimizer
 * 
 * This script converts all PNG and JPG images in src/assets to WebP.
 * Requirement: Ensure 'ffmpeg' or ImageMagick is installed on your system.
 * 
 * Usage: node optimize-assets.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'src', 'assets');

function convertToWebp() {
    console.log('--- Learn2Earn Asset Optimization ---');

    if (!fs.existsSync(ASSETS_DIR)) {
        console.error('Error: src/assets directory not found.');
        return;
    }

    const files = fs.readdirSync(ASSETS_DIR);
    let count = 0;

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            const input = path.join(ASSETS_DIR, file);
            const output = path.join(ASSETS_DIR, file.replace(ext, '.webp'));

            try {
                // Try ffmpeg first
                console.log(`Converting: ${file}...`);
                execSync(`ffmpeg -i "${input}" -quality 80 "${output}" -y`, { stdio: 'ignore' });
                count++;
            } catch (err) {
                // Try magick as fallback
                try {
                    execSync(`magick "${input}" -quality 80 "${output}"`, { stdio: 'ignore' });
                    count++;
                } catch (err2) {
                    console.error(`Failed to convert ${file}. Ensure ffmpeg or ImageMagick is installed.`);
                }
            }
        }
    });

    console.log(`--- Finished! Converted ${count} assets to WebP ---`);
}

convertToWebp();
