#!/usr/bin/env python3
"""Generate Faith Wanjiru CV PDF — engineering editorial style, 2 pages max."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)

INK = HexColor("#172027")
SOFT = HexColor("#66717A")
FAINT = HexColor("#9AA3AB")
ENG = HexColor("#2457A6")
AMBER = HexColor("#D99A2B")
LINE = HexColor("#D7DBDE")
PAPER = HexColor("#FFFFFF")

OUT = "/home/z/my-project/public/cv/faith-wanjiru-cv.pdf"

ss = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=22, leading=26, textColor=INK),
    "role": ParagraphStyle("role", fontName="Helvetica", fontSize=10.5, leading=14, textColor=INK),
    "meta": ParagraphStyle("meta", fontName="Courier", fontSize=8, leading=12, textColor=SOFT),
    "h2": ParagraphStyle("h2", fontName="Courier-Bold", fontSize=9, leading=12, textColor=ENG, spaceBefore=10, spaceAfter=3),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9, leading=13, textColor=SOFT),
    "bodyink": ParagraphStyle("bodyink", fontName="Helvetica", fontSize=9, leading=13, textColor=INK),
    "item": ParagraphStyle("item", fontName="Helvetica", fontSize=8.5, leading=12, textColor=SOFT, leftIndent=8, bulletIndent=0),
    "small": ParagraphStyle("small", fontName="Helvetica-Oblique", fontSize=7, leading=10, textColor=FAINT),
}


def section(title):
    return [
        Paragraph(title.upper(), ss["h2"]),
        HRFlowable(width="100%", thickness=0.8, color=INK, spaceAfter=5),
    ]


def page_deco(canvas, doc):
    canvas.saveState()
    w, h = A4
    # border frame
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.7)
    canvas.rect(10 * mm, 12 * mm, w - 20 * mm, h - 24 * mm)
    # corner crosshairs
    canvas.setStrokeColor(FAINT)
    for (cx, cy) in [(10 * mm, h - 12 * mm), (w - 10 * mm, h - 12 * mm), (10 * mm, 12 * mm), (w - 10 * mm, 12 * mm)]:
        canvas.line(cx - 3.5 * mm, cy, cx + 3.5 * mm, cy)
        canvas.line(cx, cy - 3.5 * mm, cx, cy + 3.5 * mm)
    # footer
    canvas.setFont("Courier", 6.5)
    canvas.setFillColor(FAINT)
    canvas.drawString(14 * mm, 7 * mm, "FAITH WANJIRU - CV  |  DEMONSTRATION DOCUMENT - [PLACEHOLDERS] REQUIRE VERIFICATION")
    canvas.drawRightString(w - 14 * mm, 7 * mm, f"SHT {canvas.getPageNumber()}/2  REV A")
    canvas.restoreState()


doc = BaseDocTemplate(
    OUT, pagesize=A4,
    leftMargin=16 * mm, rightMargin=16 * mm, topMargin=18 * mm, bottomMargin=18 * mm,
    title="Faith Wanjiru - Curriculum Vitae",
    author="Faith Wanjiru",
    subject="Graduate Civil & Structural Engineer - CV",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")
doc.addPageTemplates([PageTemplate(id="p", frames=[frame], onPage=page_deco)])

S = []

# ── header ─────────────────────────────────────────────────────────
S.append(Paragraph("FAITH WANJIRU", ss["name"]))
S.append(Spacer(1, 2))
S.append(Paragraph("Graduate Civil &amp; Structural Engineer", ss["role"]))
S.append(Spacer(1, 4))
S.append(Paragraph("faith.wanjiru@example.com   |   linkedin.com/in/faith-wanjiru   |   Kenya", ss["meta"]))
S.append(Spacer(1, 5))
S.append(Paragraph(
    "Civil &amp; Structural Engineering graduate focused on structural design, construction and "
    "sustainable infrastructure - with academic and practical exposure to structural analysis, "
    "reinforced concrete design, geotechnics, surveying and construction technology.",
    ss["body"]))
S.append(Spacer(1, 6))

# ── education ──────────────────────────────────────────────────────
S += section("Education")
edu = Table(
    [[Paragraph("<b>B.Eng. Civil &amp; Structural Engineering</b><br/>Moi University · School of Engineering · Eldoret, Kenya", ss["bodyink"]),
      Paragraph("2021 - 2026", ss["meta"])]],
    colWidths=[doc.width - 30 * mm, 30 * mm])
edu.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
]))
S.append(edu)
S.append(Spacer(1, 3))
S.append(Paragraph(
    "Key coursework: structural analysis · reinforced concrete design · steel structures · soil mechanics · "
    "foundation engineering · highway &amp; transportation engineering · hydraulics &amp; hydrology · "
    "construction technology &amp; management · engineering surveying · engineering economics.", ss["body"]))

# ── attachment ─────────────────────────────────────────────────────
S += section("Industrial Attachment")
S.append(Paragraph(
    "<b>Civil Engineering Intern (Industrial Attachment)</b> — [Company placeholder] · Site / Construction Engineering · May-Aug 2025 [ph]",
    ss["bodyink"]))
S.append(Spacer(1, 3))
for r in [
    "Assisted engineers with site inspections; read architectural and structural drawings.",
    "Observed reinforcement fixing, formwork inspection and concrete placing/vibration/curing.",
    "Supported measurement and quantity checks; recorded daily site activities and progress notes.",
    "Participated in levelling and setting-out activities and toolbox / safety meetings.",
    "Helped organize material test results; learned how RFIs and drawing clarifications are handled.",
]:
    S.append(Paragraph(r, ss["item"], bulletText="+"))

# ── projects ───────────────────────────────────────────────────────
S += section("Key Projects")
for p in [
    ("Structural Design &amp; Performance Assessment of a Multi-Storey RC Building",
     "Final-year project · 2026 · ETABS / AutoCAD / Excel",
     "Complete design flow: grid layout, load assessment, analysis model with manual verification checks, member design (slabs, beams, columns, isolated footings), serviceability and reinforcement detailing."),
    ("Preliminary Highway Geometric Design",
     "Academic project · 2025 · Civil 3D / AutoCAD / Excel",
     "Road alignment between control points balancing geometric standards, terrain and earthworks; plan, profile, cross-sections and drainage considerations."),
    ("Geotechnical Site Assessment &amp; Soil Classification",
     "Laboratory / field project · 2024 · Excel",
     "Sampling, moisture content, sieve analysis, Atterberg limits and Proctor compaction, interpreted into foundation-relevant classification and commentary."),
    ("Stormwater Drainage Design",
     "Academic project · 2025 · AutoCAD / Excel / QGIS",
     "Catchment delineation, rational-method peak flows, Manning-based drain sizing with self-cleansing velocity checks, profile and outlet arrangement."),
]:
    S.append(Paragraph(f"<b>{p[0]}</b> — {p[1]}", ss["bodyink"]))
    S.append(Paragraph(p[2], ss["body"]))
    S.append(Spacer(1, 4))

# ── skills ─────────────────────────────────────────────────────────
S += section("Technical Skills")
for line in [
    "<b>Structural:</b> free-body diagrams · load paths · SFD/BMD · deflection concepts · indeterminate structures (working knowledge)",
    "<b>Reinforced concrete:</b> beam / slab / column / footing design · detailing · durability (working knowledge)",
    "<b>Steel:</b> tension &amp; compression members · beam design · buckling concepts (working knowledge)",
    "<b>Geotechnical:</b> classification · Atterberg limits · compaction · shear strength · bearing capacity (working knowledge)",
    "<b>Construction:</b> drawing interpretation · site measurements · concrete works · sequencing · QC · safety awareness",
    "<b>Surveying:</b> levelling · traversing · topographic surveying · setting out (field exposure)",
]:
    S.append(Paragraph(line, ss["body"]))

# ── software ───────────────────────────────────────────────────────
S += section("Software")
S.append(Paragraph(
    "<b>Strong:</b> AutoCAD · Microsoft Excel&nbsp;&nbsp;&nbsp;<b>Working knowledge:</b> ETABS · SAP2000 · Revit Structure · Civil 3D · Microsoft Project&nbsp;&nbsp;&nbsp;"
    "<b>Academic exposure:</b> STAAD.Pro · MATLAB · Python · QGIS · Primavera P6", ss["body"]))

# ── professional development ───────────────────────────────────────
S += section("Professional Development")
S.append(Paragraph(
    "Advanced ETABS modelling · RC detailing · Eurocode design · Revit Structure · BIM coordination · "
    "quantity take-off · embodied carbon in structures · Python / Excel automation.", ss["body"]))

# ── standards exposure ─────────────────────────────────────────────
S += section("Codes &amp; Standards (academic exposure)")
S.append(Paragraph(
    "EN 1990 / 1991 / 1992 / 1993 / 1997 · BS 8110 (coursework) · Kenya road design manuals (where applicable). "
    "Academic exposure only - not professional authorization.", ss["body"]))

# ── references ─────────────────────────────────────────────────────
S += section("References")
S.append(Paragraph("Available on request - including project supervisor and industrial attachment supervisor contacts. [Placeholders pending verification.]", ss["body"]))

S.append(Spacer(1, 10))
S.append(Paragraph(
    "Demonstration CV built to specification - items marked [ph] are placeholders requiring verification. "
    "Full evidence for every claim is presented on the portfolio website.", ss["small"]))

doc.build(S)
print(f"CV PDF written to {OUT}")
