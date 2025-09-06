from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import re
import pytesseract
import os, requests

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

HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
HUGGINGFACE_API_KEY = os.getenv("HF_API_KEY")
headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}

def chunk_text(text, max_words=800):
    words = text.split()
    chunks = []
    for i in range(0, len(words), max_words):
        chunks.append(" ".join(words[i:i+max_words]))
    return chunks

def summarize_text(text):
    response = requests.post(
        HUGGINGFACE_API_URL,
        headers=headers,
        json={"inputs": text, "parameters": {"max_length": 170, "min_length": 30}}
    )
    result = response.json()
    return result[0]["summary_text"]

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
        summary = summarize_text(chunk)
        partial_summaries.append(summary)

    if len(partial_summaries) > 1:
        final_input = " ".join(partial_summaries)
        final_summary = summarize_text(final_input)
    else:
        final_summary = partial_summaries[0] if partial_summaries else ""

    return {'generated_notes': final_summary}