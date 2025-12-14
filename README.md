# Data-Visualisation-Portfolio
# 📘 PLM-Aware Document Extraction & Prioritization  
**DIS 2025 | Problem Statement 6 – OnePLM Data Extraction**

---

## 1. Problem Statement

In real-world PLM systems (such as OnePLM), product data is received as **heterogeneous documents** — formulas, safety data sheets (SDS), supplier technical documents (TDS), packaging specifications, and scanned product labels.

Key challenges:
- Documents are unstructured and non-standard
- Multiple revisions and near-duplicates coexist
- Scanned labels require OCR
- Engineers must manually decide which documents are critical
- Generic document AI tools extract text but **do not understand PLM context**

This results in high manual effort, errors, and delays in PLM workflows.

---

## 2. Proposed Solution

This Proof-of-Concept (PoC) demonstrates a **PLM-aware document intelligence pipeline** that goes beyond basic OCR by adding **semantic understanding and impact-based prioritization**.

The system:
1. Extracts text from PDFs and scanned images  
2. Identifies PLM-relevant fields (formula, revision, allergens, etc.)  
3. Detects semantic duplicates using machine learning  
4. Ranks documents by downstream PLM impact  
5. Presents results in an inspectable UI  

The objective is not just extraction, but **decision support for PLM teams**.

---

## 3. End-to-End Pipeline

### 3.1 PDF Text Extraction
- Tool: `pdfplumber`
- Converts text-based PDFs into raw text
- Output stored in `data/extracted_text/`

### 3.2 OCR for Scanned Labels
- Tools: OpenCV + Tesseract OCR
- Handles real-world product label images
- Demonstrates OCR challenges common in PLM environments

### 3.3 PLM Field Extraction
Extracted fields include:
- Document type (Formula, SDS, Label, TDS, Packaging)
- Brand and product name
- Revision identifier
- Ingredient / INCI block
- Detected allergens and context
- Extraction confidence score

Output: `results/extracted_fields.csv`

### 3.4 Semantic Duplicate Detection
- Model: Sentence-BERT (`all-MiniLM-L6-v2`)
- Detects near-duplicate documents (e.g., Formula RevA ↔ RevB, SDS variants)
- Output: `results/duplicate_analysis.csv`

### 3.5 Impact-Based Priority Ranking
Documents are ranked as **High / Medium / Low** priority based on:
- Document criticality (Formula / SDS > Label)
- Duplicate presence
- Extraction confidence

Output: `results/priority_report.csv`

---

## 4. Results & Metrics

**Dataset processed:**
- 10 product-related documents (PDF + scanned images)

**Key outcomes:**
- 13 documents successfully extracted and structured
- Correct identification of formula revisions and duplicate SDS documents
- High-risk documents automatically flagged as **High Priority**
- Low-confidence OCR outputs flagged for review

These results demonstrate reduced manual effort and improved decision accuracy for PLM teams.

---

## 5. Streamlit UI

A lightweight Streamlit application (`app.py`) allows:
- Viewing extracted PLM fields
- Inspecting duplicate document pairs
- Understanding priority decisions

The UI is intentionally simple; the core value lies in the processing pipeline.

---

## 6. Relevance to OnePLM

This solution fits naturally **before OnePLM ingestion**:
- Pre-structures incoming documents
- Detects revision and duplication issues early
- Helps engineers focus on high-impact conflicts first

It complements existing PLM systems without replacing them.

---

## 7. Scope & Limitations

This PoC does not include:
- Direct OnePLM API integration
- CAD or drawing extraction
- Model fine-tuning or continuous learning

These are deliberate scope choices for a focused and feasible PoC.

---

## 8. Conclusion

This PoC demonstrates that **PLM-aware document extraction, duplication detection, and prioritization are both feasible and valuable**.

By combining deterministic extraction, machine learning, and PLM logic, the solution directly addresses a critical bottleneck in modern PLM workflows.

---
