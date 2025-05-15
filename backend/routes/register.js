const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', (req, res) => {
  const { fname, lname, email, password, occupation } = req.body;

  if (!fname || !lname || !email || !password || !occupation) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const filePath = path.join(__dirname, '../data/user.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'This email is already registered.' });
  }

  // Add new user
  const newUser = { fname, lname, email, password, occupation, registeredAt: new Date() };
  users.push(newUser);

 fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return res.status(500).json({ error: 'Cannot save data to file' });
  }

  console.log('User saved to:', filePath);
  res.status(200).json({ message: 'Registration successful and data saved to user.json' });
});

  res.json({ message: 'Registration successful!' });
});

module.exports = router;