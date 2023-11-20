const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');

const app = express();
const port = 5001;

app.use(bodyParser.json());

app.listen(5001, () => {
    console.log("Server is runing on port 5001");
})

app.post('/users', (req, res) => {
  const newUser = req.body; 

  const users = require('./users.json');
  users.push(newUser);

  const fs = require('fs');
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

  res.json({ message: 'User registered successfully' });
});

const jsonServerRouter = jsonServer.router({ users: require('./users.json') });
app.use('/api', jsonServerRouter);

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
