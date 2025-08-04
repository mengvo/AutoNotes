from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

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

@app.get('/')
def root():
    return {'message': 'Hello World!'}

@app.post('/generate_notes')
def generate(files: list[UploadFile] = File(None), topic: str = Form(None)):
    return {'filenames': [file.filename for file in files], 'topic': topic}