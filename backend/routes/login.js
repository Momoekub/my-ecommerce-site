const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const filePath = path.join(__dirname, '../data/user.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user data:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const users = JSON.parse(data);

    // Find user by username (email)
    const user = users.find((u) => u.email === username);
    if (!user) {
      return res.status(400).json({ message: 'Incorrect Username' });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }

    // Successful login
    res.json({ message: 'Login successfully.' });
  });
});

module.exports = router;