const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const generateUniqueId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};



const usersFilePath = path.join(__dirname, 'users.json');


const readUsersFromFile = () => {
  try {
    const usersContent = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(usersContent).users;
  } catch (error) {
    console.error(error);
    return [];
  }
};


const writeUserToFile = (newUser) => {
  try {
    const users = readUsersFromFile();
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2), 'utf-8');
  } catch (error) {
    console.error(error);
  }
};


const app = express();
const port = 5002;

app.use(bodyParser.json());
app.use(cors());

app.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const newUser = {
      id: generateUniqueId(), 
      username: username,
      email: email,
      password: await hashPassword(req.body.password),
    };

    writeUserToFile(newUser); 

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});



app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = getUserByEmail(email);

    if (!user || !comparePasswords(password, user.password)) {
     
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const accessToken = generateJwtToken(user.id, user.email);

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


});

const usersRouter = jsonServer.router('users.json');
app.use('/api', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
