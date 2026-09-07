from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
import re

ROOT = Path(__file__).parent
OUT = ROOT / 'PDF'
OUT.mkdir(exist_ok=True)

font_candidates = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    '/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf',
]
font_bold_candidates = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf',
]
for p in font_candidates:
    if Path(p).exists():
        pdfmetrics.registerFont(TTFont('FactorySans', p)); break
else:
    raise RuntimeError('Unicode font not found')
for p in font_bold_candidates:
    if Path(p).exists():
        pdfmetrics.registerFont(TTFont('FactorySansBold', p)); break
else:
    raise RuntimeError('Unicode bold font not found')

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='FactoryTitle', fontName='FactorySansBold', fontSize=18, leading=22, alignment=TA_CENTER, spaceAfter=12))
styles.add(ParagraphStyle(name='FactoryH1', fontName='FactorySansBold', fontSize=14, leading=18, spaceBefore=10, spaceAfter=7))
styles.add(ParagraphStyle(name='FactoryH2', fontName='FactorySansBold', fontSize=11, leading=14, spaceBefore=7, spaceAfter=5))
styles.add(ParagraphStyle(name='FactoryBody', fontName='FactorySans', fontSize=9.5, leading=14, spaceAfter=6))
styles.add(ParagraphStyle(name='FactoryBullet', fontName='FactorySans', fontSize=9.5, leading=14, leftIndent=12, firstLineIndent=-7, spaceAfter=3))

files = sorted(ROOT.glob('*.md'))

def esc(s):
    return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

def inline(s):
    s = esc(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'`(.+?)`', r'<font name="Courier">\1</font>', s)
    return s

def make_pdf(md):
    out = OUT / (md.stem + '.pdf')
    doc = SimpleDocTemplate(str(out), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=17*mm, bottomMargin=17*mm, title=md.stem)
    story=[]
    for raw in md.read_text(encoding='utf-8').splitlines():
        line=raw.strip()
        if not line:
            story.append(Spacer(1, 4)); continue
        if line.startswith('# '):
            story.append(Paragraph(inline(line[2:]), styles['FactoryTitle']))
        elif line.startswith('## '):
            story.append(Paragraph(inline(line[3:]), styles['FactoryH1']))
        elif line.startswith('### '):
            story.append(Paragraph(inline(line[4:]), styles['FactoryH2']))
        elif line.startswith('- '):
            story.append(Paragraph('• ' + inline(line[2:]), styles['FactoryBullet']))
        elif line.startswith('**') and line.endswith('**'):
            story.append(Paragraph(inline(line), styles['FactoryBody']))
        else:
            story.append(Paragraph(inline(line), styles['FactoryBody']))
    doc.build(story)

for md in files:
    if md.name == 'README.md' or md.name == 'INDEX.md':
        continue
    make_pdf(md)

index = ROOT / 'INDEX.md'
if index.exists():
    make_pdf(index)
print(f'Generated {len(list(OUT.glob("*.pdf")))} PDFs in {OUT}')
