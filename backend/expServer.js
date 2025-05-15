const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ เส้นทาง API (แยกไฟล์แล้ว ไม่ต้องเขียนซ้ำในนี้อีก)
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/subject', require('./routes/subject'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/subscribe', require('./routes/subscribe'));

// ✅ Static files
app.use('/data', express.static(path.join(__dirname, 'data')));

// ✅ API: ดึง users ทั้งหมด
app.get('/api/users', (req, res) => {
  const users = require('./data/user.json');
  res.json(users);
});

// ✅ API: ดึงอาชีพ
app.get('/api/occupation', (req, res) => {
  console.log('Occupation API called');
  const occupationData = require('./data/occupation-cat.json');
  res.json(occupationData);
});

// ✅ Root สำหรับทดสอบ
app.get('/', (req, res) => {
  res.send('API Server is running...');
});

// ✅ Start server
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});