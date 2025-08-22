from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import re
from PIL import Image
import pytesseract

app = FastAPI()

origins = [
    'http://localhost:5173',
    'localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#! debugging
global_parsed_text = ''

OCR_BASELINE = 50

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
                        parsed_text += re.sub(r"[^\w\s.,;:!?()\-]", "", text) + '\n'
                    else:
                        image = page.to_image(resolution=400).original
                        ocr_text = pytesseract.image_to_string(image)
                        ocr_text = re.sub(r"[^\w\s.,;:!?()\-]", "", ocr_text)
                        parsed_text += ocr_text + '\n'

    if topic and topic.strip():
        parsed_text = f"Topic: {topic.strip()}\n\n{parsed_text}"

    #! debugging
    global global_parsed_text
    global_parsed_text = parsed_text
    #!
    return {'parsed_text': parsed_text}
    

@app.get('/debug')
def debug():
    return {'parsed_text': global_parsed_text}