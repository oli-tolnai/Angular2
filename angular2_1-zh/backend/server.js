const express = require('express');
const app = express();
const port = 3000;

// Middleware a JSON body parsing-hoz
app.use(express.json());

// Példa userek (id, name, score)
let users = [
  { id: 1, name: 'Kovács János', score: 85 },
  { id: 2, name: 'Nagy Anna', score: 92 },
  { id: 3, name: 'Szabó Péter', score: 78 },
  { id: 4, name: 'Kiss Mária', score: 95 }
];

// GET /users - visszaadja az összes usert
app.get('/users', (req, res) => {
  res.json(users);
});

// POST /user - hozzáad egy új usert
app.post('/user', (req, res) => {
  const { name, score } = req.body;

  // Validáció
  if (!name || score === undefined) {
    return res.status(400).json({ 
      error: 'Hiányzó adatok. A name és score mezők kötelezőek.' 
    });
  }

  // Új user létrehozása automatikus ID-val
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    score
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Szerver indítása
app.listen(port, () => {
  console.log(`\n🚀 Szerver fut a http://localhost:${port} címen\n`);
  console.log('Elérhető API endpointok:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  GET  http://localhost:${port}/users`);
  console.log('       → Visszaadja az összes usert');
  console.log('');
  console.log(`  POST http://localhost:${port}/user`);
  console.log('       → Hozzáad egy új usert');
  console.log('       → Body: { "name": "string", "score": number }');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});
