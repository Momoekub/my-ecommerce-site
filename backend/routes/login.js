const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(405).json({ message: 'Please use POST method for login.' });
});

router.post('/', (req, res) => {
  const { username, password } = req.body;

  // โหลดข้อมูลจากไฟล์ user.json
  fs.readFile('data/user.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user.json:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing user.json:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // ค้นหาผู้ใช้ที่มี email และ password ตรงกัน
    const user = users.find(user => user.email === username && user.password === password);

    if (user) {
      return res.json({ message: 'Login successfully.' });
    } else {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
  });
});

module.exports = router;