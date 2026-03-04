const TRANSLATION_SYSTEM = `You are a Telugu translator. Translate into modern spoken Telugu (వ్యావహారిక తెలుగు) — the natural, everyday Telugu that educated people speak in Hyderabad or Vijayawada. NOT classical/literary Telugu (గ్రాంధిక తెలుగు).

STYLE RULES (most important):
- Sound like a Telugu person casually explaining something to a friend — clear, natural, easy to read aloud
- Use SHORT sentences. Break one long English sentence into 2-3 short Telugu ones if needed
- AVOID heavy Sanskrit-based formal words. Use the simpler everyday version:
  ❌ "పరిశోధన నిర్వహించబడింది" → ✅ "research చేశారు"
  ❌ "ప్రభావితమవుతుంది" → ✅ "effect అవుతుంది"
  ❌ "అనుభవిస్తున్నారు" → ✅ "feel అవుతున్నారు"
  ❌ "నిర్ధారించబడింది" → ✅ "confirm అయింది"
  ❌ "సూచించబడింది" → ✅ "suggest చేశారు"
  ❌ "వివరించబడింది" → ✅ "explain చేశారు"
  ❌ "అభివృద్ధి చేయబడింది" → ✅ "develop చేశారు"
  ❌ "ఉపయోగించబడింది" → ✅ "use చేశారు"
- Mix English terms naturally, exactly how Telugu speakers do:
  "ఈ study లో...", "results చూపించాయి", "participants కి...", "data తీసుకున్నారు", "కానీ significant గా ఉంది"
- Prefer active voice: "వాళ్ళు చేశారు" not "చేయబడింది"
- Use common Telugu connectors: కాబట్టి, అందుకే, కానీ, అయితే, అంటే, ఇంకా, కూడా

CONTENT RULES:
1. Translate EVERY SINGLE sentence — do not skip or summarize anything
2. Keep these in English exactly as-is:
   - Medical/psych terms: ADHD, hyperactivity, autism, dyslexia, depression, anxiety, cognitive, behavioral, etc.
   - CS/tech terms: programming, algorithm, software, code, AI, machine learning, interface, etc.
   - All citations: [1], [2], (Author, 2020), etc.
   - Names of people, universities, journals, conferences
   - Emails, URLs, figure/table labels (Fig. 1, Table 2, etc.)
3. Keep bullet points (•) and numbered lists in the same format
4. Return ONLY the translation — no explanations, no meta-comments, nothing extra`;

async function callClaude(body) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { action, ...payload } = req.body;

    // Layer 1: translate a single chunk
    if (action === "translate_chunk") {
      const data = await callClaude({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        system: TRANSLATION_SYSTEM,
        messages: [{ role: "user", content: `Translate this section to Telugu:\n\n${payload.chunk}` }],
      });
      if (data.error) return res.status(400).json({ error: data.error });
      return res.json({ text: data.content?.[0]?.text || "" });
    }

    // Layer 2: gap check — find sentences missing from translation
    if (action === "gap_check") {
      const data = await callClaude({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        system: "You are a translation quality checker. Return only valid JSON.",
        messages: [{
          role: "user",
          content: `Compare these two texts. List any sentences, bullet points, citations like [1][2] or numbers that exist in the ORIGINAL but are MISSING from the TRANSLATION. Return them as JSON: {"missing": ["sentence1", "sentence2"]}\n\nORIGINAL:\n${payload.original}\n\nTRANSLATION:\n${payload.translated}`,
        }],
      });
      if (data.error) return res.status(400).json({ error: data.error });
      const raw = data.content?.[0]?.text || '{"missing":[]}';
      try {
        const json = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] || '{"missing":[]}');
        return res.json(json);
      } catch {
        return res.json({ missing: [] });
      }
    }

    // Layer 2b: translate missing pieces
    if (action === "translate_missing") {
      const data = await callClaude({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: TRANSLATION_SYSTEM,
        messages: [{ role: "user", content: `Translate these missing sentences to Telugu:\n\n${payload.missing.join("\n")}` }],
      });
      if (data.error) return res.status(400).json({ error: data.error });
      return res.json({ text: data.content?.[0]?.text || "" });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
}
