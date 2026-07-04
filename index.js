const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Il tuo assistente è online!');
});

app.post('/chat', (req, res) => {
  const messaggio = req.body.message || "Ciao";
  res.json({ 
    reply: "Ciao! Sono il tuo assistente personale. Come posso aiutarti oggi?" 
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Assistente attivo sulla porta ${PORT}`);
});
