"""Handling authentication and authorization"""
from fastapi import APIRouter, Request, Form,UploadFile , File
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from .controller import convertHTMLToMarkdown, convertMarkdownToHTML

router = APIRouter()

templates = Jinja2Templates(directory="src/templates")

@router.get("/",response_class=HTMLResponse)
def convert(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

@router.post("/convert", response_class=HTMLResponse)
def convert(request: Request, body: str = Form(...),type: str = Form(...)):
    result = ""
    convertType = ""
    if type == "Html":
        convertType = "MarkDown"
        result = convertHTMLToMarkdown(body.strip())
    elif type == "MarkDown":
        convertType = "HTML"
        result = convertMarkdownToHTML(body.strip())
    else:
        return templates.TemplateResponse("home.html", {"request": request, "error": "Invalid type"})
    return templates.TemplateResponse("convert.html", {"request": request, "result": result, "type": type, "convertType": convertType})
