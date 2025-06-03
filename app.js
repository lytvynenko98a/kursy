const sql = require('mssql');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path   = require('path');
const fs     = require('fs');
const app = express();
app.use(cors());
app.use(express.json());


// підключення до БД
const config = {
  user: 'webuser2',
  password: 'Str0ngP@ss',
  server: 'DESKTOP-VUT1MA1\\SQLEXPRESS',
  database: 'Courses',
  options: {
    trustServerCertificate: true   // потрібне для локального self-signed
  }
};


const UPLOAD_DIR = path.join(__dirname, 'public', 'courses');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
app.use('/public', express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename:    (_, file, cb) => {
    // робимо щось на кшталт  js_basics-1716628891.jpg
    const ext  = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext)
                    .toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'');
    cb(null, `${base}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

//виведення таблиць
function getData(tableName, res) {
  sql.connect(config, function(err) {
    if (err) {
      console.log('Error connecting to database:', err);
      return;
    }
    var request = new sql.Request();
    request.query(`SELECT * FROM ${tableName}`, function(err, recordset) {
      if (err) {
        console.log(`Error executing query for ${tableName}:`, err);
        return;
      }
      

      res.send(recordset.recordset);
    });
  });
}

const tables = ['Courses', 'Teachers', 'Reviews'];

app.get('/schedule', (req, res) => {
  sql.connect(config, err => {
    if (err) return res.status(500).send('DB error');

    const request = new sql.Request();
    request.query(`
      SELECT id, name, start_date AS startDate, end_date AS endDate
      FROM Courses
    `, (err, { recordset }) => {
      if (err) return res.status(500).send('Query error');
      res.json(recordset);          // [{id, name, startDate, endDate}, …]
    });
  });
});

app.get('/:table', (req, res) => {
  const tableName = req.params.table;
  if (tableName === 'teachers') {
    const query = `
      SELECT Teachers.id, Teachers.name, Teachers.experience, Teachers.photo, Courses.name AS teaches
      FROM Teachers
      LEFT JOIN Courses ON Teachers.course_id = Courses.id
    `;
    sql.connect(config, (err) => {
      if (err) {
        console.log('Error connecting to database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      var request = new sql.Request();
      request.query(query, (err, recordset) => {
        if (err) {
          console.log('Error executing query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.send(recordset.recordset);
      });
    });
  } else {
    getData(tableName, res);
  }
});



function getCourseDetails(courseId, res) {
  sql.connect(config, (err) => {
    if (err) {
      console.log('Error connecting to database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    var request = new sql.Request();
    request.input('id', sql.Int, courseId);
    request.query(`
      SELECT * FROM Courses WHERE id = @id;
    `, (err, courseRecordset) => {
      if (err) {
        console.log('Error executing query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      if (courseRecordset.recordset.length === 0) {
        res.status(404).send('Course not found');
      } else {
        const course = courseRecordset.recordset[0];
        var lessonRequest = new sql.Request();
        lessonRequest.input('id', sql.Int, courseId);
        lessonRequest.query(`
          SELECT * FROM Lessons WHERE course_id = @id;
        `, (err, lessonRecordset) => {
          if (err) {
            console.log('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          const lessons = lessonRecordset.recordset;
          const courseDetails = { ...course, lessons };
          res.send(courseDetails);
        });
      }
    });
  });
}

app.get('/courses/:id', (req, res) => {
  const courseId = Number(req.params.id);
  getCourseDetails(courseId, res);
});

function insertFeedback(name, email, message) {
  sql.connect(config, function(err) {
    if (err) {
      console.log('Error connecting to database:', err);
      return;
    }
    var request = new sql.Request();
    request.input('name', sql.NVarChar(100), name);
    request.input('email', sql.NVarChar(255), email);
    request.input('message', sql.NVarChar(sql.MAX), message);
    request.query(`INSERT INTO Feedback (name, email, message) VALUES (@name, @email, @message)`, function(err, recordset) {
      if (err) {
        console.log('Error executing query:', err);
        return;
      }
      console.log('Feedback inserted successfully.');
    });
  });
}

app.post('/feedback', (req, res) => {
  const { name, email, message } = req.body;
  insertFeedback(name, email, message);
  res.status(200).send('Feedback received successfully.');
});
app.post('/courses', upload.single('image'), (req, res) => {
  // eslint-disable-next-line camelcase
  const { name, description, price, duration, startDate, endDate } = req.body;
  const imagePath = req.file ? `/courses/${req.file.filename}` : null;

  sql.connect(config, err => {
    if (err) return res.status(500).send('DB error');

    const q = `
      INSERT INTO Courses (name, description, price, duration, image,
                           start_date, end_date, created_at)
      OUTPUT INSERTED.*
      VALUES (@n,@d,@p,@dur,@img,@sd,@ed, GETDATE())
    `;

    new sql.Request()
      .input('n',   sql.NVarChar(100), name)
      .input('d',   sql.NVarChar(sql.MAX), description)
      .input('p',   sql.Decimal(10,2),    price)
      .input('dur', sql.Int,             duration)
      .input('img', sql.NVarChar(255),   imagePath)
      .input('sd',  sql.Date,            startDate)
      .input('ed',  sql.Date,            endDate)
      .query(q, (err, { recordset }) => {
        if (err) return res.status(500).send('Insert error');
        res.status(201).json(recordset[0]);
      });
  });
});

app.post('/lessons', (req, res) => {
  const { course_id, title, order_no } = req.body;

  sql.connect(config, err => {
    if (err) return res.status(500).send('DB error');

    const q = `
      INSERT INTO Lessons (course_id, title, content, order_no)
      OUTPUT INSERTED.*
      VALUES (@cid, @t, '', @ord)
    `;

    const r = new sql.Request()
      .input('cid', sql.Int, course_id)
      .input('t',   sql.NVarChar(100), title)
      .input('ord', sql.Int, order_no);

    r.query(q, (err, { recordset }) => {
      if (err) return res.status(500).send('Insert error');
      res.status(201).json(recordset[0]);      // новий урок
    });
  });
});

/* --------------------------------------------------------- *
 *   /login   – перевіряє прості креденшли й повертає OK
 *   тіло: { user, pass }    |   успіх: { ok: true }
 * --------------------------------------------------------- */
const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    return res.json({ ok: true });          // 200
  }
  res.status(401).send('Wrong credentials');
});





const { InferenceClient } = require('@huggingface/inference');
//const sql = require('mssql');

// Ініціалізація клієнта Hugging Face
const hf = new InferenceClient(process.env.HF_API_KEY || 'КЛЮЧ ДО API');

// Функція для отримання курсів з БД
async function getCoursesFromDB() {
  await sql.connect(config);
  const result = await sql.query`SELECT * FROM Courses`;
  return result.recordset;
}

// Генерація контексту для моделі
function generateContext(courses) {
  return `Ти - асистент для підбору курсів. Доступні курси:\n${
    courses.map(c => `- ${c.name}: ${c.description.substring(0, 100)}...`).join('\n')
  }`;
}

// Оновлений endpoint для чат-бота
app.post('/chatbot', async (req, res) => {
  const { message } = req.body;
  
  try {
    // 1. Отримуємо курси з бази даних
    const courses = await getCoursesFromDB();
    const context = generateContext(courses);
    
    // 2. Відправляємо запит до моделі
    const response = await hf.chatCompletion({
      provider: "novita",
      model: "deepseek-ai/DeepSeek-V3-0324", // Або інша модель
      messages: [
        {
          role: "system",
          content: context
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });
    
    // 3. Аналізуємо відповідь та знаходимо курси
    const botResponse = response.choices[0].message.content;
    const mentionedCourses = courses.filter(course => 
      botResponse.toLowerCase().includes(course.name.toLowerCase())
    );
    
    res.json({
      text: botResponse,
      courses: mentionedCourses.slice(0, 3) // Повертаємо до 3 курсів
    });
    
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      text: 'Вибачте, сталася помилка. Будь ласка, спробуйте ще раз.',
      error: error.message
    });
  }
});

// підключення серверу
const server = app.listen(3000, () => {
  console.log('Server is running..');
});