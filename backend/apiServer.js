const express = require('express');
const app = express();
const loginRoutes = require('./routes/login'); // โหลด route login ของคุณ

app.use(express.json()); // เพื่อให้สามารถรับข้อมูล JSON ใน POST requests

// เส้นทางหลัก (root route)
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// เส้นทางสำหรับการเข้าสู่ระบบ
app.use('/api/login', loginRoutes);

// ตรวจจับข้อผิดพลาดทั่วไป
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).send('Internal Server Error');
});

// รันเซิร์ฟเวอร์
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Error starting server:', err.message);
});