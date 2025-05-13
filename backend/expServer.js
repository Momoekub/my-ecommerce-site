const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/data', express.static(path.join(__dirname, 'data')));

app.use('/api/subject', require('./routes/subject'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/login', require('./routes/login'));

app.use('/api/occupation', (req, res) => {
  console.log('Occupation API called');
  const occupationData = require('./data/occupation-cat.json');
  res.json(occupationData);
});

app.post('/api/register', (req, res) => {
  const { fname, lname, email, password, occupation } = req.body;

  if (!fname || !lname || !email || !password || !occupation) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const filePath = path.resolve(__dirname, 'data/user.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let users = [];

    if (!err && data) {
      try {
        users = JSON.parse(data);
        if (!Array.isArray(users)) {
          users = [];
        }
      } catch (e) {
        console.error('Invalid JSON, resetting to empty array.');
        users = [];
      }
    }

    users.push({
      fname,
      lname,
      email,
      password,
      occupation,
      registeredAt: new Date().toISOString(),
    });

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).json({ error: 'Cannot save data to file' });
      }

      res.status(200).json({ message: 'Registration successful and data saved to user.json' });
    });
  });
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});