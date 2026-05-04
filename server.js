// ─────────────────────────────────────────────────────────────────
//  server.js  —  Document Intelligence Backend
//
//  HOW TO RUN:
//  1. Open this folder in your terminal
//  2. Run:  npm install
//  3. Run:  node server.js
//  4. Open: http://localhost:3000
// ─────────────────────────────────────────────────────────────────

const express  = require('express');
const cors     = require('cors');
const multer   = require('multer');
const path     = require('path');
const fs       = require('fs');
const https    = require('https');

// ── CONFIGURATION ─────────────────────────────────────────────────
//  Paste your Groq API key here (get it free at console.groq.com)
const GROQ_API_KEY = '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';  // starts with gsk_
const MODEL        = 'llama-3.3-70b-versatile';
const PORT         = 3000;

// ── SETUP ─────────────────────────────────────────────────────────
const app    = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB max

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ── ROUTES ────────────────────────────────────────────────────────

// Health check
app.get('/api/status', (req, res) => {
  const keySet = GROQ_API_KEY !== 'YOUR_GROQ_API_KEY_HERE';
  res.json({ ok: keySet, model: MODEL, message: keySet ? 'Ready' : 'Add your GROQ_API_KEY in server.js' });
});

// Main chat endpoint — takes a list of messages and returns a reply
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  if (GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
    return res.status(500).json({ error: 'GROQ_API_KEY not set in server.js' });
  }

  try {
    const reply = await callGroq(messages);
    res.json({ reply });
  } catch (err) {
    console.error('Groq error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GROQ API CALL ─────────────────────────────────────────────────
function callGroq(messages) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      temperature: 0.3,
      messages: [
        { role: 'system', content: 'You are a helpful, precise assistant. Base all answers strictly on the document the user provided.' },
        ...messages
      ]
    });

    const options = {
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (groqRes) => {
      let data = '';
      groqRes.on('data', chunk => data += chunk);
      groqRes.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (groqRes.statusCode !== 200) {
            const msg = parsed?.error?.message || `HTTP ${groqRes.statusCode}`;
            if (groqRes.statusCode === 401) return reject(new Error('Invalid Groq API key. Check server.js.'));
            if (groqRes.statusCode === 429) return reject(new Error('Groq rate limit hit. Wait a moment and try again.'));
            if (groqRes.statusCode === 413) return reject(new Error('Document too large for Groq. Try a shorter document.'));
            return reject(new Error(`Groq error (${groqRes.statusCode}): ${msg}`));
          }
          const text = parsed?.choices?.[0]?.message?.content;
          if (!text) return reject(new Error('Groq returned empty response.'));
          resolve(text);
        } catch (e) {
          reject(new Error('Failed to parse Groq response: ' + e.message));
        }
      });
    });

    req.on('error', (e) => reject(new Error('Network error calling Groq: ' + e.message)));
    req.write(body);
    req.end();
  });
}

// ── START ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ✅  Document Intelligence running!');
  console.log(`  🌐  Open: http://localhost:${PORT}`);
  console.log('');
  if (GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
    console.log('  ⚠️   WARNING: Add your Groq API key in server.js first!');
    console.log('       Get a free key at: https://console.groq.com');
    console.log('');
  }
});