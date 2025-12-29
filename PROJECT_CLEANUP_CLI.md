# cleanup-cli

An intelligent CLI tool powered by local Ollama LLM that automatically organizes messy desktops and directories through deep content analysis.

## 1. Core Functionality
- **Automatic Categorization**: Analyzes file content (not just extensions) to determine the best category.
- **Intelligent Naming**: Suggests better filenames based on document headers or metadata.
- **Format Support**: Deep support for PDF, DOCX, TXT, MD, JPG, PNG, and common code files.
- **Custom Rules**: Define your own organization patterns in `config.yaml`.

## 2. Technical Specifications
- **LLM Engine**: Integration with local Ollama (defaulting to `llama3`).
- **Performance**: Processes ~50 files/second (metadata) and ~2 files/second (deep LLM analysis).
- **Cross-Platform**: Native binaries for Windows, macOS (Intel/M1), and Linux.
- **Resource Usage**: ~200MB RAM (CLI) + Ollama model requirements (e.g., 4GB for 7B models).

## 3. User Experience
- **Interactive TUI**: Built with Bubble Tea for beautiful, responsive terminal UI.
- **Real-time Feedback**: Progress bars and live classification logs.
- **Safety First**: Dry-run mode and automatic undo/recovery logs.
- **Configuration**: Easy YAML-based configuration for power users.

## 4. Quick Start
```bash
# Install via brew
brew install xuanyiying/tap/cleanup-cli

# Run organization on desktop
cleanup-cli organize --path ~/Desktop --model llama3
```

## 5. Troubleshooting
- **Ollama Not Found**: Ensure Ollama is running locally (`ollama serve`).
- **Permission Denied**: Run with `sudo` or check directory permissions.
- **Model Loading Slow**: First run will download the model (~4GB).

---
*Maintained by [xuanyiying](https://github.com/xuanyiying)*
