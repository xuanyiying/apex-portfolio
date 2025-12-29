# Portfolio Project Design Specifications

This document outlines the design language, interactive logic, and device adaptation strategy for the project mockups in this portfolio.

## 1. Design Philosophy
The mockups are designed as **Technical Illustrations** rather than just screenshots. They aim to communicate:
- **Architecture**: How the system is structured.
- **Workflow**: How data flows or how users interact.
- **Modernity**: Clean, minimal, and high-performance aesthetics.

## 2. Project-Specific Designs

### [MedAI-Consultant](public/images/projects/medai.svg)
- **Theme**: Healthcare / Trust / Professional Light Mode.
- **Key Elements**:
  - **Conversational UI**: Demonstrates the AI assistant interaction for triage.
  - **Consultation Workflow**: Shows the pre-diagnosis survey logic.
  - **RAG Interpretation**: Visualizes the AI's ability to analyze blood tests and reports.
- **Color Palette**: Sky Blue (#0EA5E9), Clean White (#FFFFFF), Slate Gray (#334155).

### [cleanup-cli](public/images/projects/cleanup-cli.svg)
- **Theme**: AI-Powered Utility / System Tool / Deep Space.
- **Key Elements**:
  - **Ollama Core**: Visual representation of the local LLM engine processing data.
  - **Before/After Flow**: Messy file icons transforming into structured directories.
  - **CLI Terminal**: Shows the Bubble Tea TUI interface with real-time AI classification logs.
  - **Compatibility Badges**: Highlight cross-platform support and versioning.
- **Color Palette**: Slate Blue (#0F172A), Sky Blue (#38BDF8), Emerald Green (#10B981).

### [cleanup-assistant](public/images/projects/cleanup-assistant.svg)
- **Theme**: System / Cloud-Native / Observability.
- **Key Elements**:
  - **Terminal Interface**: Demonstrates the CLI nature and Go's efficiency.
  - **Metrics Dashboard**: Visualizes concurrency (goroutines) and system impact.
  - **Disk Usage Gauge**: Clear indicator of the "Cleanup" outcome.
- **Color Palette**: Emerald Green (#10B981), Slate Gray (#1A1C23).

### [ai-ace-job](public/images/projects/ai-ace-job.svg)
- **Theme**: AI / Intelligent / Light Mode Professional.
- **Key Elements**:
  - **Agentic UI**: Chat-based interaction showing AI-human collaboration.
  - **Resume Scoring**: Visual data insight (Match Score).
  - **Interview Cards**: Functional preview of job-prep features.
- **Color Palette**: Indigo Blue (#6366F1), Soft White (#F8FAFC).

### [WedMaster](public/images/projects/wedmaster.svg)
- **Theme**: SaaS / B2B / Elegant Relational.
- **Key Elements**:
  - **Interactive Calendar**: Shows multi-tenancy and event management.
  - **CRM Sidebar**: Highlights client management capabilities.
  - **Script Editor**: Displays document generation and RBAC logic.
- **Color Palette**: Rose Pink (#E11D48), Warm White (#FFFBFB).

## 3. Responsive & Multi-Device Strategy

### Desktop (Standard)
- All SVGs are generated at **1920x1080 (16:9)**.
- Layouts use a "Window-in-Window" approach for consistent framing.

### Tablet / Mobile Adaptation
To ensure these high-detail mockups remain legible on smaller screens:
1.  **CSS Aspect Ratio**: Containers use `aspect-ratio: 16/9` to maintain framing.
2.  **SVG Viewport Scaling**: Since these are vector-based, they scale perfectly without pixelation.
3.  **Selective Zoom**: On mobile devices (screen width < 768px), the portfolio UI should apply a `scale(1.1)` transform on hover to allow users to inspect details.
4.  **Fallback**: If high-detail SVGs are too complex for certain mobile browsers, a simplified "Thumbnail" version (focusing only on the central UI window) is recommended.

## 4. Technical Implementation
- **Format**: SVG (Scalable Vector Graphics).
- **Benefits**: Infinite resolution, small file size (approx. 5-15KB per image), and searchable text.
- **Integration**: Referenced via standard `<img>` tags or React components.
