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
    const messaggio = req.body.message || "Ciao";
    
    const response = await axios.post('https://api.x.ai/v1/chat/completions', {
      model: "grok-beta",
      messages: [
        { role: "user", content: messaggio }
      ],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const rispostaAI = response.data.choices[0].message.content;
    res.json({ reply: rispostaAI });
    
  } catch (error) {
    console.error('Errore:', error.message);
    res.json({ reply: "Mi dispiace, ho avuto un problema. Puoi ripetere?" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Assistente Grok attivo sulla porta ${PORT}`);
});
