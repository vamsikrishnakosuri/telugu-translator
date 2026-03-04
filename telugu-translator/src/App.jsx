import { useState, useRef } from "react";

const COLORS = {
  bg: "#0f0e17",
  surface: "#1a1828",
  card: "#221f35",
  accent: "#ff6b35",
  accent2: "#f7c59f",
  text: "#fffffe",
  muted: "#a7a9be",
  border: "#2e2b45",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: COLORS.bg,
    fontFamily: "'Georgia', serif",
    color: COLORS.text,
    padding: "0",
    margin: "0",
  },
  header: {
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "28px 48px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: COLORS.surface,
  },
  logo: {
    fontSize: "32px",
    fontWeight: "700",
    letterSpacing: "-1px",
    color: COLORS.accent,
    fontFamily: "'Georgia', serif",
  },
  logoSub: {
    fontSize: "13px",
    color: COLORS.muted,
    letterSpacing: "3px",
    textTransform: "uppercase",
    marginTop: "2px",
  },
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "48px 24px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "48px",
  },
  heroTitle: {
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: "700",
    lineHeight: "1.2",
    marginBottom: "16px",
    color: COLORS.text,
  },
  heroHighlight: {
    color: COLORS.accent,
    fontStyle: "italic",
  },
  heroSub: {
    fontSize: "16px",
    color: COLORS.muted,
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: "1.7",
  },
  uploadBox: {
    border: `2px dashed ${COLORS.border}`,
    borderRadius: "16px",
    padding: "48px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: COLORS.card,
    marginBottom: "24px",
    position: "relative",
    overflow: "hidden",
  },
  uploadBoxActive: {
    borderColor: COLORS.accent,
    background: "#2a2040",
  },
  uploadIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  uploadTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: COLORS.text,
  },
  uploadSub: {
    fontSize: "14px",
    color: COLORS.muted,
  },
  fileChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#2a2040",
    border: `1px solid ${COLORS.accent}`,
    borderRadius: "8px",
    padding: "10px 18px",
    fontSize: "14px",
    color: COLORS.accent2,
    marginBottom: "24px",
  },
  btn: {
    display: "block",
    width: "100%",
    padding: "16px",
    background: COLORS.accent,
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "0.5px",
    transition: "all 0.2s ease",
    fontFamily: "'Georgia', serif",
  },
  btnDisabled: {
    background: COLORS.border,
    color: COLORS.muted,
    cursor: "not-allowed",
  },
  progressWrap: {
    marginTop: "24px",
    background: COLORS.card,
    borderRadius: "12px",
    padding: "24px",
    border: `1px solid ${COLORS.border}`,
  },
  progressLabel: {
    fontSize: "14px",
    color: COLORS.muted,
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  progressBar: {
    height: "6px",
    borderRadius: "3px",
    background: COLORS.border,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "3px",
    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
    transition: "width 0.5s ease",
  },
  resultBox: {
    marginTop: "40px",
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "16px",
    overflow: "hidden",
  },
  resultHeader: {
    padding: "20px 28px",
    background: COLORS.surface,
    borderBottom: `1px solid ${COLORS.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: COLORS.accent2,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  copyBtn: {
    padding: "8px 16px",
    background: "transparent",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "8px",
    color: COLORS.muted,
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "'Georgia', serif",
  },
  resultContent: {
    padding: "28px",
    fontSize: "17px",
    lineHeight: "2",
    color: COLORS.text,
    maxHeight: "600px",
    overflowY: "auto",
    whiteSpace: "pre-wrap",
    fontFamily: "'Noto Serif Telugu', 'Georgia', serif",
  },
  errorBox: {
    marginTop: "24px",
    background: "#2d1a1a",
    border: "1px solid #7f2020",
    borderRadius: "12px",
    padding: "20px 24px",
    color: "#ff9999",
    fontSize: "14px",
  },
  spinner: {
    display: "inline-block",
    width: "18px",
    height: "18px",
    border: "3px solid rgba(255,107,53,0.3)",
    borderTop: `3px solid ${COLORS.accent}`,
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginRight: "10px",
    verticalAlign: "middle",
  },
};

// Inject keyframes
const styleTag = document.createElement("style");
styleTag.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu&display=swap');
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .result-animate { animation: fadeIn 0.5s ease forwards; }
  .upload-hover:hover { border-color: #ff6b35 !important; background: #2a2040 !important; }
  .btn-hover:hover:not(:disabled) { background: #e85a25 !important; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,107,53,0.3); }
  .copy-hover:hover { border-color: #ff6b35 !important; color: #ff6b35 !important; }
`;
document.head.appendChild(styleTag);

function extractTextFromPDF(file) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = async () => {
      try {
        const pdfjsLib = window.pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          fullText += `\n--- Page ${i} ---\n${pageText}\n`;
        }
        resolve(fullText.trim());
      } catch (e) {
        reject(e);
      }
    };
    script.onerror = () => reject(new Error("Failed to load PDF.js"));
    if (!window.pdfjsLib) {
      document.head.appendChild(script);
    } else {
      script.onload();
    }
  });
}

async function translateWithClaude(text, onChunk) {
  // Split text into chunks of ~3000 chars to handle large papers
  const CHUNK_SIZE = 3000;
  const chunks = [];
  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    chunks.push(text.slice(i, i + CHUNK_SIZE));
  }

  let fullTranslation = "";
  for (let i = 0; i < chunks.length; i++) {
    onChunk(i, chunks.length);
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system:
          "You are a professional academic translator. Translate the given English research paper text into Telugu (తెలుగు) accurately. Keep technical terms in English where there is no Telugu equivalent. Preserve paragraph structure. Return ONLY the Telugu translation, nothing else.",
        messages: [
          {
            role: "user",
            content: `Translate this research paper section to Telugu:\n\n${chunks[i]}`,
          },
        ],
      }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    const translated = data.content?.[0]?.text || "";
    fullTranslation += translated + "\n\n";
  }
  return fullTranslation.trim();
}

export default function App() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | extracting | translating | done | error
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef();

  const handleFile = (f) => {
    if (f && f.type === "application/pdf") {
      setFile(f);
      setTranslation("");
      setError("");
      setStatus("idle");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  const handleTranslate = async () => {
    if (!file) return;
    setStatus("extracting");
    setError("");
    setTranslation("");
    try {
      const text = await extractTextFromPDF(file);
      setStatus("translating");
      const result = await translateWithClaude(text, (current, total) => {
        setProgress({ current: current + 1, total });
      });
      setTranslation(result);
      setStatus("done");
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPct =
    progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;

  const isLoading = status === "extracting" || status === "translating";

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.logo}>తెలుగు · Translate</div>
          <div style={styles.logoSub}>Research Paper Translator</div>
        </div>
      </div>

      <div style={styles.main}>
        {/* Hero */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Read your research in <span style={styles.heroHighlight}>Telugu</span>
          </h1>
          <p style={styles.heroSub}>
            Upload any research paper PDF and get a full Telugu translation instantly. Perfect for
            understanding complex academic content in your native language.
          </p>
        </div>

        {/* Upload Area */}
        <div
          className="upload-hover"
          style={{
            ...styles.uploadBox,
            ...(dragging ? styles.uploadBoxActive : {}),
          }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <div style={styles.uploadIcon}>📄</div>
          <div style={styles.uploadTitle}>
            {dragging ? "Drop it here!" : "Click or drag your PDF here"}
          </div>
          <div style={styles.uploadSub}>Supports any research paper PDF</div>
        </div>

        {/* File chip */}
        {file && (
          <div style={styles.fileChip}>
            📎 <span>{file.name}</span>
            <span style={{ color: COLORS.muted, fontSize: "12px" }}>
              ({(file.size / 1024).toFixed(0)} KB)
            </span>
          </div>
        )}

        {/* Translate Button */}
        <button
          className="btn-hover"
          style={{
            ...styles.btn,
            ...((!file || isLoading) ? styles.btnDisabled : {}),
          }}
          onClick={handleTranslate}
          disabled={!file || isLoading}
        >
          {isLoading ? (
            <>
              <span style={styles.spinner} />
              {status === "extracting" ? "Extracting text from PDF..." : `Translating to Telugu... (${progressPct}%)`}
            </>
          ) : (
            "✨ Translate to Telugu"
          )}
        </button>

        {/* Progress bar */}
        {status === "translating" && (
          <div style={styles.progressWrap}>
            <div style={styles.progressLabel}>
              <span>Translating section {progress.current} of {progress.total}</span>
              <span>{progressPct}%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progressPct}%` }} />
            </div>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div style={styles.errorBox}>⚠️ {error}</div>
        )}

        {/* Result */}
        {status === "done" && translation && (
          <div className="result-animate" style={styles.resultBox}>
            <div style={styles.resultHeader}>
              <div style={styles.resultTitle}>
                <span>🇮🇳</span> Telugu Translation
              </div>
              <button
                className="copy-hover"
                style={styles.copyBtn}
                onClick={handleCopy}
              >
                {copied ? "✅ Copied!" : "📋 Copy all"}
              </button>
            </div>
            <div style={styles.resultContent}>{translation}</div>
          </div>
        )}
      </div>
    </div>
  );
}