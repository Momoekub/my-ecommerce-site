const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // ใช้สำหรับจัดการไฟล์
const app = express();

const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/subject', require('./routes/subject'));
app.use('/api/contact', require('./routes/contact'));

// New route for occupation categories
app.use('/api/occupation', (req, res) => {
  const occupationData = require('./data/occupation-cat.json');
  res.json(occupationData);
});

// Route สำหรับการลงทะเบียน
app.post('/api/register', (req, res) => {
  const { fname, lname, email, occupation } = req.body; // ดึงข้อมูลจาก request body

  // ตรวจสอบว่าข้อมูลครบถ้วน
  if (!fname || !lname || !email || !occupation) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // สร้างข้อความที่จะเขียนลงไฟล์
  const dataToWrite = `First Name: ${fname}\nLast Name: ${lname}\nEmail: ${email}\nOccupation: ${occupation}\n---\n`;

  // เขียนข้อมูลลงไฟล์ registerData.txt
  fs.appendFile('registerData.txt', dataToWrite, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ error: 'Failed to save data to file' });
    }

    // ส่งข้อความตอบกลับเมื่อบันทึกสำเร็จ
    res.status(200).json({ message: 'Registration successful and saved to file' });
  });
});

// ฟังบนพอร์ต 4000
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});