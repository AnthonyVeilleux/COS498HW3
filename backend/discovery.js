const fs = require('fs');
const path = require('path');

/**
 * PDF Discovery Module
 * Searches for available PDF documents in a designated folder
 */

let pdfCache = null;
let cacheTimestamp = null;
const CACHE_TTL = 60000; // Cache for 60 seconds

/**
 * Parse metadata file
 */
function parseMetadata(folderPath) {
    const metadataPath = path.join(folderPath, 'metadata.json');
    try {
        if (fs.existsSync(metadataPath)) {
            const data = fs.readFileSync(metadataPath, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error parsing metadata:', err);
    }
    return [];
}

/**
 * Scan folder and create list of available PDFs
 */
function scanPDFFolder(folderPath) {
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        
        const pdfFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.pdf'));
        const metadata = parseMetadata(folderPath);
        
        // Combine PDFs with metadata
        return pdfFiles.map(filename => {
            const meta = metadata.find(m => m.filename === filename);
            return {
                filename: filename,
                title: meta ? meta.title : filename,
                description: meta ? meta.description : ''
            };
        });
    } catch (err) {
        console.error('Error reading PDFs directory:', err);
        return [];
    }
}

/**
 * Get list of PDFs with caching
 */
function getPDFList(folderPath) {
    const now = Date.now();
    
    // Return cached list if still valid
    if (pdfCache && cacheTimestamp && (now - cacheTimestamp < CACHE_TTL)) {
        return pdfCache;
    }
    
    // Refresh cache
    pdfCache = scanPDFFolder(folderPath);
    cacheTimestamp = now;
    
    return pdfCache;
}

module.exports = {
    getPDFList
};
