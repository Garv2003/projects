"""Logic convert HTML TO MARKDOWN or Vice Versa"""
import markdown 
import markdownify

def convertHTMLToMarkdown(html: str) -> str:
    return markdownify.markdownify(html)
    

def convertMarkdownToHTML(md: str) -> str:
    return markdown.markdown(md)
    