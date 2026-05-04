# BriefMe 📄⚡

> Upload any PDF or Word doc and get an instant AI-powered summary + ask questions about it.
> **Your document, briefed in seconds.**

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203.3%2070B-orange?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## ✨ Features

- 📄 **Upload any PDF or Word doc** (.pdf, .doc, .docx) — any size
- 🧠 **Instant ~100 word summary** powered by Groq + LLaMA 3.3 70B
- 💬 **Ask questions** about your document and get accurate answers
- ⚡ **Blazing fast** — Groq's LPU hardware makes responses near-instant
- 🔒 **API key stays on the server** — never exposed in the browser
- 🆓 **Free to run** — Groq offers a free tier, no credit card needed

---

## 🖥️ Preview

1. Drop in any document
2. Get a clean ~100 word summary instantly
3. Ask anything — *"What are the key findings?"*, *"Who wrote this?"*, *"What's the conclusion?"*

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A free Groq API key from [console.groq.com](https://console.groq.com)

### Installation

**1. Clone the repo**
```bash
git clone https://github.com/Abhishek200309/BriefMe.git
cd BriefMe
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up your API key**

Create a `.env` file in the root folder:
```
GROQ_API_KEY=gsk_your_api_key_here
```

> Get your free key at [console.groq.com](https://console.groq.com) → Sign up → API Keys → Create API Key. No credit card needed.

**4. Start the server**
```bash
node server.js
```

**5. Open the app**

Go to [http://localhost:3000](http://localhost:3000) in your browser. That's it! 🎉

---

## 📁 Project Structure

```
BriefMe/
├── server.js         # Node.js + Express backend (calls Groq API)
├── package.json      # Project dependencies
├── .env              # Your API key — never commit this!
├── .gitignore        # Ignores node_modules and .env
└── public/
    └── index.html    # Frontend UI (served by Express)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Node.js + Express |
| AI Model | LLaMA 3.3 70B via Groq API |
| PDF Parsing | PDF.js |
| DOCX Parsing | Mammoth.js |

---

## ⚙️ Configuration

You can swap the AI model in `server.js`:

```js
const MODEL = 'llama-3.3-70b-versatile'; // default — best quality
// const MODEL = 'llama-3.1-8b-instant';  // faster, lighter
// const MODEL = 'mixtral-8x7b-32768';    // large context window
```

---

## 🆓 Groq Free Tier Limits

| Limit | Value |
|---|---|
| Requests per minute | 30 |
| Requests per day | 14,400 |
| Credit card required | ❌ No |

---

## 🔒 Security Note

Never commit your `.env` file or hardcode your API key in `server.js`. Make sure your `.gitignore` includes:

```
node_modules/
.env
```

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## 🙌 Acknowledgements

- [Groq](https://groq.com) for the fast free inference API
- [PDF.js](https://mozilla.github.io/pdf.js/) by Mozilla for PDF parsing
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js) for DOCX parsing
