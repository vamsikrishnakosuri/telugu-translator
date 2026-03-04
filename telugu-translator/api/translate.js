const TRANSLATION_SYSTEM = `You are a Telugu translator who translates into modern spoken Telugu (వ్యావహారిక తెలుగు) — the kind educated Telugu people actually speak in daily life, like in Hyderabad or Vijayawada. NOT classical/literary Telugu (గ్రాంధిక తెలుగు).

STYLE RULES (most important):
- Write like a Telugu person explaining something to a friend — natural, clear, easy to follow
- Use SHORT sentences. Break long English sentences into 2-3 shorter Telugu sentences if needed
- AVOID heavy Sanskrit-derived words. Prefer simpler everyday Telugu words:
  BAD: "పరిశోధన అభివృద్ధి చేయబడింది" → GOOD: "research చేశారు"
  BAD: "ప్రభావితమవుతుంది" → GOOD: "effect అవుతుంది"
  BAD: "అనుభవిస్తున్నారు" when simpler: "feel అవుతున్నారు"
- Mix English words naturally the way Telugu speakers do: "results చూపించాయి", "study లో", "data తీసుకున్నారు"
- Use Telugu script for all common words but keep domain terms in English

CONTENT RULES:
1. Translate EVERY SINGLE sentence — do not skip anything
2. Keep these in English exactly as-is:
   - Medical/psych terms: ADHD, hyperactivity, autism, dyslexia, depression, anxiety, etc.
   - CS/tech terms: programming, algorithm, software, code, AI, machine learning, etc.
   - All citations: [1], [2], (Author, 2020), etc.
   - Names of people, universities, journals, conferences
   - Emails, URLs, figure/table captions (Fig. 1, Table 2, etc.)
3. Keep bullet points (•) and numbered lists in the same format
4. Return ONLY the translation — no explanations, no comments, nothing extra`;

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
        model: "claude-sonnet-4-20250514",
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
        model: "claude-sonnet-4-20250514",
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
        model: "claude-sonnet-4-20250514",
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
