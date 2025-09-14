# Autonotes

**Autonotes** is an AI-powered note generator that converts PDFs and text topics into concise, structured notes. Using Hugging Face’s BART model for summarization, Autonotes is designed to help students, professionals, and anyone looking to quickly digest large amounts of text.

Link: https://auto-notes.vercel.app/

---

## Features

- Upload PDF files or provide a topic to generate notes.
- Supports both text-based PDFs and scanned/image-based PDFs with OCR.
- Summarizes content into clear, concise notes using **BART** (Hugging Face model).
- Chunking ensures long documents are summarized efficiently.
- Clean, responsive React frontend with drag-and-drop file uploads.

---

## Tech Stack

- **Backend:** FastAPI  
- **Frontend:** React + Chakra UI  
- **AI Model:** Hugging Face `facebook/bart-large-cnn`  
- **OCR:** pytesseract  
- **PDF Parsing:** pdfplumber  
- **Deployment:** Render and Vercel

---

## What I Learned

While building Autonotes, I gained hands-on experience in multiple areas of modern software development:

- **React:** Learned how to build dynamic frontends using components, state management, hooks, props, and event handling. I also explored creating reusable UI components and integrating libraries like Chakra UI.  
- **FastAPI:** Learned how to build a robust backend API, handle file uploads, process requests, and manage CORS.  
- **PDF Parsing:** Explored different methods to extract text from PDFs, including direct text extraction with `pdfplumber` and OCR-based extraction using `pytesseract` for scanned documents.  
- **AI Integration:** Learned how to leverage pre-trained AI models from Hugging Face, including sending requests, handling responses, and using models for summarization tasks.  
- **Full-Stack Development:** Gained experience connecting a React frontend with a FastAPI backend, sending multipart form data, and handling asynchronous API responses.  

This project strengthened my understanding of building end-to-end applications that combine web development, file processing, and AI technologies.
