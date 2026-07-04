const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message || "Ciao";

    const response = await axios.post('https://api.x.ai/v1/chat/completions', {
      model: "grok-4.3",
      messages: [
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiResponse = response.data.choices[0].message.content;
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Errore API:', error.response?.data || error.message);
    res.json({ reply: "Mi dispiace, sto avendo problemi a rispondere in questo momento." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Assistente attivo sulla porta ${PORT}`);
});
