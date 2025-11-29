const express = require('express');
const path = require('path');
const { getPDFList } = require('./discovery');
const { validatePDF } = require('./pdfvalidation');

const router = express.Router();
const PDFS_FOLDER = path.join(__dirname, 'pdfs');

/**
 * Home page route - displays all available PDFs
 */
router.get('/', (req, res) => {
    const pdfs = getPDFList(PDFS_FOLDER);
    res.render('home', { pdfs: pdfs });
});

/**
 * PDF endpoint - serve individual PDF files
 */
router.get('/pdf/:filename', (req, res) => {
    const filename = req.params.filename;
    
    // Validate PDF
    const error = validatePDF(filename, PDFS_FOLDER);
    if (error) {
        if (error.status === 404) {
            return res.status(404).render('404', { 
                message: error.message,
                path: req.path 
            });
        }
        return res.status(error.status).send(error.message);
    }
    
    // Serve the PDF file
    const filepath = path.join(PDFS_FOLDER, filename);
    res.sendFile(filepath);
});

/**
 * 404 handler for all undefined routes
 */
function notFoundHandler(req, res) {
    res.status(404).render('404', { 
        message: 'Page not found',
        path: req.path 
    });
}

module.exports = {
    router,
    notFoundHandler
};
