const TRANSLATION_SYSTEM = `You are a Telugu translator. Rules:
1. Translate EVERY SINGLE sentence - do not skip anything
2. Keep ADHD, hyperactivity, programming, algorithm, software and all technical/medical terms in English
3. Keep ALL citations exactly as-is: [1], [2], (Author, 2020) etc.
4. Keep names, emails, URLs, figure captions (Fig. 1, Fig. 2) in English
5. Use simple conversational Telugu - like how friends talk, not textbook Telugu
6. Keep bullet points (•) and numbered lists in same format
7. Return ONLY the translation, nothing else, no explanations`;

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
