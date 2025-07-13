from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from feedback_logic import process_file

app = FastAPI()

# Allow CORS for local React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_file(name: str = Form(...), file: UploadFile = Form(...)):
    input_path = f"temp_{file.filename}"
    output_path = f"output_{file.filename}"

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    process_file(input_path, output_path, name)

    return FileResponse(output_path, filename=output_path, media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')




