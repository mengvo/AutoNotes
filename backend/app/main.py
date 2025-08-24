from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import re
import pytesseract
from transformers import pipeline

app = FastAPI()

origins = [
    'http://localhost:5173',
    'localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

OCR_BASELINE = 50

summarizer = pipeline('summarization', model='facebook/bart-large-cnn')

def chunk_text(text, max_words=800):
    words = text.split()
    chunks = []
    for i in range(0, len(words), max_words):
        chunks.append(" ".join(words[i:i+max_words]))
    return chunks

@app.get('/')
def root():
    return {'message': 'Hello World!'}

@app.post('/generate_notes')
def generate(files: list[UploadFile] = File(None), topic: str = Form(None)):
    parsed_text = ''
    if files:
        for upload_file in files:
            upload_file.file.seek(0)
            with pdfplumber.open(upload_file.file) as pdf:
                for page in pdf.pages:
                    text = page.extract_text()
                    if text and len(text.strip()) > OCR_BASELINE:
                        # regex to ensure only letters, numbers, spaces, punctuation
                        parsed_text += re.sub(r'[^\w\s.,;:!?()\-]', '', text) + '\n'
                    else:
                        image = page.to_image(resolution=400).original
                        ocr_text = pytesseract.image_to_string(image)
                        ocr_text = re.sub(r'[^\w\s.,;:!?()\-]', '', ocr_text)
                        parsed_text += ocr_text + '\n'

    if topic and topic.strip():
        parsed_text = f'Topic: {topic.strip()}\n\n{parsed_text}'

    chunks = chunk_text(parsed_text)

    partial_summaries = []
    for chunk in chunks:
        result = summarizer(chunk, max_length=170, min_length=30, do_sample=False)
        partial_summaries.append(result[0]['summary_text'])

    if len(partial_summaries) > 1:
        final_input = " ".join(partial_summaries)
        final_summary = summarizer(final_input, max_length=250, min_length=60, do_sample=False)[0]['summary_text']
    else:
        final_summary = partial_summaries[0] if partial_summaries else ""

    return {'generated_notes': final_summary}