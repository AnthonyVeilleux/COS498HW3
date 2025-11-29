# PDF Documentation Library

A simple web application for hosting and viewing programming language documentation PDFs using Node.js, Express.js, and Handlebars.

## Features
- PDF discovery module with caching
- Metadata support for PDF titles and descriptions
- PDF validation and security
- Custom routing module
- 404 error handling
- Docker containerized

## Quick Start

1. **Clone and run**
   ```bash
   git clone https://github.com/AnthonyVeilleux/COS498MidtermAV.git
   cd COS498MidtermAV
   sudo docker compose up -d
   ```

2. **Access the app**
   - Open `http://localhost:80` in your browser

3. **Add PDFs**
   - Place PDF files in `backend/pdfs/` directory
   - Update `backend/pdfs/metadata.json` with titles and descriptions

## Development Mode
```bash
sudo docker compose -f docker-compose.dev.yml up -d
```

## Stop the app
```bash
sudo docker compose down
```

## Project Structure
```
backend/
  ├── server.js           # Main application server
  ├── routes.js           # Routing module
  ├── discovery.js        # PDF discovery module with caching
  ├── pdfvalidation.js    # PDF validation module
  └── pdfs/
      ├── metadata.json   # PDF metadata (titles, descriptions)
      └── *.pdf           # PDF files
views/
  ├── home.hbs            # Main page template
  └── 404.hbs             # 404 error page
```

