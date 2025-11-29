const fs = require('fs');
const path = require('path');

/**
 * PDF Validation Module
 * Checks if requested PDF documents exist
 */

/**
 * Check if PDF exists in designated folder
 */
function pdfExists(filename, folderPath) {
    const filepath = path.join(folderPath, filename);
    return fs.existsSync(filepath);
}

/**
 * Validate PDF before serving
 * Returns error response if invalid, null if valid
 */
function validatePDF(filename, folderPath) {
    // Only allow PDFs within designated folder
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        return { status: 400, message: 'Invalid filename' };
    }
    
    if (!filename.endsWith('.pdf')) {
        return { status: 400, message: 'Only PDF files allowed' };
    }
    
    // Check if PDF exists
    if (!pdfExists(filename, folderPath)) {
        return { status: 404, message: 'PDF not found' };
    }
    
    return null;
}

module.exports = {
    validatePDF,
    pdfExists
};
