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
    height: "100vh",
    background: COLORS.bg,
    fontFamily: "'Georgia', serif",
    color: COLORS.text,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "18px 40px",
    display: "flex",
    alignItems: "center",
    background: COLORS.surface,
    flexShrink: 0,
  },
  logo: { fontSize: "26px", fontWeight: "700", letterSpacing: "-1px", color: COLORS.accent },
  logoSub: { fontSize: "11px", color: COLORS.muted, letterSpacing: "3px", textTransform: "uppercase", marginTop: "2px" },
  body: { display: "flex", flex: 1, overflow: "hidden" },

  // Left panel
  leftPanel: {
    width: "400px",
    minWidth: "340px",
    padding: "28px 24px",
    overflowY: "auto",
    borderRight: `1px solid ${COLORS.border}`,
    background: COLORS.surface,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sectionLabel: { fontSize: "11px", color: COLORS.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" },
  uploadBox: {
    border: `2px dashed ${COLORS.border}`,
    borderRadius: "12px",
    padding: "28px 20px",
    textAlign: "center",
    cursor: "pointer",
    background: COLORS.card,
    transition: "all 0.2s",
  },
  uploadIcon: { fontSize: "36px", marginBottom: "10px" },
  uploadTitle: { fontSize: "15px", fontWeight: "600", marginBottom: "5px" },
  uploadSub: { fontSize: "13px", color: COLORS.muted },
  fileChip: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#2a2040",
    border: `1px solid ${COLORS.accent}`,
    borderRadius: "8px",
    padding: "9px 14px",
    fontSize: "13px",
    color: COLORS.accent2,
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: COLORS.accent,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    transition: "all 0.2s",
  },
  btnDisabled: { background: COLORS.border, color: COLORS.muted, cursor: "not-allowed" },
  progressWrap: {
    background: COLORS.card,
    borderRadius: "10px",
    padding: "14px 18px",
    border: `1px solid ${COLORS.border}`,
  },
  progressLabel: { fontSize: "12px", color: COLORS.muted, marginBottom: "8px", display: "flex", justifyContent: "space-between" },
  progressBar: { height: "5px", borderRadius: "3px", background: COLORS.border, overflow: "hidden" },
  progressFill: {
    height: "100%",
    borderRadius: "3px",
    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
    transition: "width 0.5s ease",
  },
  errorBox: {
    background: "#2d1a1a",
    border: "1px solid #7f2020",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#ff9999",
    fontSize: "13px",
  },
  successBox: {
    background: "#1a2d1a",
    border: "1px solid #2a5a2a",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#7aff7a",
    fontSize: "13px",
  },
  spinner: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,107,53,0.3)",
    borderTop: `2px solid ${COLORS.accent}`,
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginRight: "8px",
    verticalAlign: "middle",
  },

  // Right panel
  rightPanel: { flex: 1, overflowY: "auto", background: COLORS.bg, position: "relative" },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: "14px",
    padding: "40px",
    color: COLORS.muted,
  },
  emptyIcon: { fontSize: "72px", opacity: 0.25 },
  emptyTitle: { fontSize: "18px", fontWeight: "600", color: COLORS.border },
  emptyText: { fontSize: "14px", textAlign: "center", maxWidth: "260px", lineHeight: "1.7" },
  stickyBar: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    gap: "10px",
    padding: "14px 24px",
    borderBottom: `1px solid ${COLORS.border}`,
    background: COLORS.surface,
  },
  actionBtnFill: {
    padding: "9px 18px",
    background: COLORS.accent,
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    fontWeight: "600",
  },
  actionBtnOutline: {
    padding: "9px 18px",
    background: "transparent",
    border: `1px solid ${COLORS.accent}`,
    color: COLORS.accent,
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    fontWeight: "600",
  },
  pageCard: {
    margin: "20px 24px",
    background: COLORS.card,
    borderRadius: "12px",
    overflow: "hidden",
    border: `1px solid ${COLORS.border}`,
  },
  pageLabel: {
    padding: "7px 14px",
    fontSize: "11px",
    color: COLORS.muted,
    borderBottom: `1px solid ${COLORS.border}`,
    letterSpacing: "1px",
  },
  pageImg: { width: "100%", display: "block", borderBottom: `1px solid ${COLORS.border}` },
  pageTranslation: {
    padding: "18px 22px",
    fontSize: "15px",
    lineHeight: "2",
    color: COLORS.text,
    fontFamily: "'Noto Serif Telugu', 'Georgia', serif",
    whiteSpace: "pre-wrap",
  },
  pageTranslating: {
    padding: "18px 22px",
    color: COLORS.muted,
    fontSize: "13px",
    fontStyle: "italic",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  fullTextSection: { padding: "24px" },
  fullTextBox: {
    fontSize: "15px",
    lineHeight: "2.1",
    color: COLORS.text,
    fontFamily: "'Noto Serif Telugu', 'Georgia', serif",
    whiteSpace: "pre-wrap",
    background: COLORS.card,
    borderRadius: "12px",
    padding: "28px",
    border: `1px solid ${COLORS.border}`,
  },
};

// Inject global styles
const styleTag = document.createElement("style");
styleTag.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu&display=swap');
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  .upload-hover:hover { border-color: #ff6b35 !important; background: #2a2040 !important; }
  .btn-primary:hover:not(:disabled) { background: #e85a25 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,107,53,0.3); }
`;
document.head.appendChild(styleTag);

// ─── PDF.js helpers ───────────────────────────────────────────────────────────

async function loadPDFJS() {
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) { resolve(window.pdfjsLib); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      resolve(window.pdfjsLib);
    };
    script.onerror = () => reject(new Error("Failed to load PDF.js"));
    document.head.appendChild(script);
  });
}

async function extractTextFromPDF(file) {
  const pdfjsLib = await loadPDFJS();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += `\n--- Page ${i} ---\n${content.items.map((item) => item.str).join(" ")}\n`;
  }
  return fullText.trim();
}

// Renders each PDF page to a JPEG data URL, calls onPage(index, dataUrl) per page
async function renderPDFPages(file, onPage) {
  const pdfjsLib = await loadPDFJS();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.4 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    onPage(i - 1, canvas.toDataURL("image/jpeg", 0.82));
  }
}

// ─── Translation ──────────────────────────────────────────────────────────────

async function translateWithClaude(text, onChunkDone) {
  const CHUNK_SIZE = 3000;
  const chunks = [];
  for (let i = 0; i < text.length; i += CHUNK_SIZE) chunks.push(text.slice(i, i + CHUNK_SIZE));

  for (let i = 0; i < chunks.length; i++) {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system:
          "You are a professional academic translator. Translate the given English research paper text into Telugu (తెలుగు) accurately. Keep technical terms in English where there is no Telugu equivalent. Preserve paragraph structure. Return ONLY the Telugu translation, nothing else.",
        messages: [{ role: "user", content: `Translate this research paper section to Telugu:\n\n${chunks[i]}` }],
      }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    onChunkDone(i, chunks.length, data.content?.[0]?.text || "");
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | rendering | extracting | translating | done | error
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [pdfPages, setPdfPages] = useState([]); // array of JPEG data URLs
  const [translatedChunks, setTranslatedChunks] = useState([]); // sparse array indexed by chunk
  const [error, setError] = useState("");
  const inputRef = useRef();
  const textSectionRef = useRef();

  const fullTranslation = translatedChunks.filter(Boolean).join("\n\n");
  const hasTranslation = translatedChunks.some(Boolean);
  const isDone = status === "done";
  const isLoading = ["rendering", "extracting", "translating"].includes(status);

  const handleFile = async (f) => {
    if (!f || f.type !== "application/pdf") return;
    setFile(f);
    setPdfPages([]);
    setTranslatedChunks([]);
    setError("");
    setStatus("rendering");
    try {
      await renderPDFPages(f, (index, dataUrl) => {
        setPdfPages((prev) => { const next = [...prev]; next[index] = dataUrl; return next; });
      });
    } catch (_) { /* graceful degradation — translation still works without page images */ }
    setStatus("idle");
  };

  const handleDrop = (e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); };

  const handleTranslate = async () => {
    if (!file) return;
    setStatus("extracting");
    setError("");
    setTranslatedChunks([]);
    setProgress({ current: 0, total: 0 });
    try {
      const text = await extractTextFromPDF(file);
      setStatus("translating");
      await translateWithClaude(text, (index, total, chunkText) => {
        setProgress({ current: index + 1, total });
        setTranslatedChunks((prev) => { const next = [...prev]; next[index] = chunkText; return next; });
      });
      setStatus("done");
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([fullTranslation], { type: "text/plain;charset=utf-8" });
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: `${file?.name?.replace(".pdf", "") || "translation"}_telugu.txt`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const progressPct = progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;
  const numPages = pdfPages.length;
  const numChunks = progress.total;

  // Map a page index to the best matching chunk index
  const pageToChunk = (pageIdx) =>
    numChunks > 0 ? Math.min(Math.floor((pageIdx / Math.max(numPages, 1)) * numChunks), numChunks - 1) : pageIdx;

  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <div style={styles.header}>
        <div>
          <div style={styles.logo}>తెలుగు · Translate</div>
          <div style={styles.logoSub}>Research Paper Translator</div>
        </div>
      </div>

      <div style={styles.body}>
        {/* ── Left Panel ── */}
        <div style={styles.leftPanel}>
          <div style={styles.sectionLabel}>Upload Document</div>

          <div
            className="upload-hover"
            style={{ ...styles.uploadBox, ...(dragging ? { borderColor: COLORS.accent, background: "#2a2040" } : {}) }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
          >
            <input ref={inputRef} type="file" accept="application/pdf" style={{ display: "none" }}
              onChange={(e) => handleFile(e.target.files[0])} />
            <div style={styles.uploadIcon}>📄</div>
            <div style={styles.uploadTitle}>{dragging ? "Drop it here!" : "Click or drag PDF here"}</div>
            <div style={styles.uploadSub}>Any research paper PDF</div>
          </div>

          {file && (
            <div style={styles.fileChip}>
              📎
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
              <span style={{ color: COLORS.muted, fontSize: "11px", flexShrink: 0 }}>
                ({(file.size / 1024).toFixed(0)} KB)
              </span>
            </div>
          )}

          {status === "rendering" && (
            <div style={{ fontSize: "13px", color: COLORS.muted, display: "flex", alignItems: "center" }}>
              <span style={styles.spinner} /> Rendering PDF pages…
            </div>
          )}
          {pdfPages.length > 0 && status !== "rendering" && (
            <div style={{ fontSize: "13px", color: COLORS.muted }}>
              ✅ {pdfPages.length} page{pdfPages.length !== 1 ? "s" : ""} loaded
            </div>
          )}

          <button
            className="btn-primary"
            style={{ ...styles.btn, ...((!file || isLoading) ? styles.btnDisabled : {}) }}
            onClick={handleTranslate}
            disabled={!file || isLoading}
          >
            {status === "extracting" ? <><span style={styles.spinner} />Extracting text…</>
              : status === "translating" ? <><span style={styles.spinner} />Translating… ({progressPct}%)</>
              : status === "rendering" ? <><span style={styles.spinner} />Loading…</>
              : "✨ Translate to Telugu"}
          </button>

          {status === "translating" && (
            <div style={styles.progressWrap}>
              <div style={styles.progressLabel}>
                <span>Section {progress.current} of {progress.total}</span>
                <span>{progressPct}%</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${progressPct}%` }} />
              </div>
            </div>
          )}

          {status === "error" && <div style={styles.errorBox}>⚠️ {error}</div>}
          {isDone && (
            <div style={styles.successBox}>
              ✅ Done! {progress.total} section{progress.total !== 1 ? "s" : ""} translated.
            </div>
          )}
        </div>

        {/* ── Right Panel ── */}
        <div style={styles.rightPanel}>
          {/* Empty — no file */}
          {!file && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🗒️</div>
              <div style={styles.emptyTitle}>No document uploaded</div>
              <div style={styles.emptyText}>
                Upload a research paper PDF on the left. Your Telugu translation will appear here, page by page.
              </div>
            </div>
          )}

          {/* File loaded but not yet translating */}
          {file && !hasTranslation && !["extracting", "translating"].includes(status) && (
            <div style={styles.emptyState}>
              <div style={{ fontSize: "52px", opacity: 0.4 }}>🌐</div>
              <div style={styles.emptyTitle}>Ready to translate</div>
              <div style={styles.emptyText}>
                {pdfPages.length > 0
                  ? `${pdfPages.length} pages loaded. Click "Translate to Telugu" to begin.`
                  : 'Click "Translate to Telugu" to begin.'}
              </div>
              {pdfPages[0] && (
                <img src={pdfPages[0]} alt="Page 1"
                  style={{ maxWidth: "260px", borderRadius: "8px", opacity: 0.55, border: `1px solid ${COLORS.border}`, marginTop: "8px" }} />
              )}
            </div>
          )}

          {/* Translation in progress or done */}
          {(hasTranslation || status === "extracting" || status === "translating") && (
            <>
              {/* Sticky action bar */}
              {isDone && (
                <div style={styles.stickyBar}>
                  <button style={styles.actionBtnFill} onClick={handleDownload}>⬇️ Download Telugu PDF</button>
                  <button style={styles.actionBtnOutline} onClick={() => textSectionRef.current?.scrollIntoView({ behavior: "smooth" })}>
                    📖 Read here
                  </button>
                </div>
              )}

              {/* Pages with per-chunk translation */}
              {pdfPages.length > 0
                ? pdfPages.map((dataUrl, pageIdx) => {
                    const chunkIdx = pageToChunk(pageIdx);
                    const chunkText = translatedChunks[chunkIdx];
                    const isActiveChunk = status === "translating" && progress.current - 1 === chunkIdx;
                    return (
                      <div key={pageIdx} className="fade-in" style={styles.pageCard}>
                        <div style={styles.pageLabel}>PAGE {pageIdx + 1}</div>
                        <img src={dataUrl} alt={`Page ${pageIdx + 1}`} style={styles.pageImg} />
                        {chunkText
                          ? <div style={styles.pageTranslation}>{chunkText}</div>
                          : (status === "translating" || status === "extracting")
                            ? <div style={styles.pageTranslating}><span style={styles.spinner} />{isActiveChunk ? "Translating this section…" : "Waiting…"}</div>
                            : null}
                      </div>
                    );
                  })
                : /* No page images — show chunks as cards */
                  translatedChunks.map((chunk, i) =>
                    chunk ? (
                      <div key={i} className="fade-in" style={styles.pageCard}>
                        <div style={styles.pageLabel}>SECTION {i + 1}</div>
                        <div style={styles.pageTranslation}>{chunk}</div>
                      </div>
                    ) : null
                  )}

              {/* Full translation text (anchor for "Read here") */}
              {isDone && (
                <div ref={textSectionRef} style={styles.fullTextSection}>
                  <div style={{ fontSize: "11px", color: COLORS.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>
                    Full Translation
                  </div>
                  <div style={styles.fullTextBox}>{fullTranslation}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
